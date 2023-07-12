import { PoapMomentsApi, CompassProvider } from '@poap-xyz/providers';
import { PaginatedResult, nextCursor } from '@poap-xyz/utils';
import { Moment } from '../domain/Moment';
import {
  createBetweenFilter,
  createFilter,
  createInFilter,
  creatEqFilter,
  filterUndefinedProperties,
} from '../queries/utils';
import {
  MomentResponse,
  MomentsQueryResponse,
  PAGINATED_MOMENTS_QUERY,
} from '../queries';
import { CreateMomentInput } from './dtos/create/CreateInput';
import { CreateSteps } from './dtos/create/CreateSteps';
import { FetchMomentsInput } from './dtos/fetch/FetchMomentsInput';

export class MomentsClient {
  constructor(
    private poapMomentsApi: PoapMomentsApi,
    private CompassProvider: CompassProvider,
  ) {}

  public async createMoment(input: CreateMomentInput): Promise<Moment> {
    const defaultOnStepUpdate = (): void => {
      //do nothing
    };
    const onStepUpdate = input.onStepUpdate || defaultOnStepUpdate;
    void onStepUpdate(CreateSteps.REQUESTING_MEDIA_UPLOAD_URL);
    const { url, key } = await this.poapMomentsApi.getSignedUrl();
    void onStepUpdate(CreateSteps.UPLOADING_MEDIA);
    await this.poapMomentsApi.uploadFile(
      input.fileBinary,
      url,
      input.fileType,
      input.onFileUploadProgress,
    );
    void onStepUpdate(CreateSteps.UPLOADING_MEDIA_METADATA);
    //  we will be adding metadata to the media in the future
    void onStepUpdate(CreateSteps.PROCESSING_MEDIA);
    try {
      await this.poapMomentsApi.waitForMediaProcessing(key, input.timeOut);
    } catch (error) {
      void onStepUpdate(CreateSteps.PROCESSING_MEDIA_ERROR);
      throw error;
    }
    void onStepUpdate(CreateSteps.UPLOADING_MOMENT);
    const response = await this.poapMomentsApi.createMoment({
      dropId: input.dropId,
      author: input.author,
      mediaKey: key,
      tokenId: input.tokenId,
    });
    void onStepUpdate(CreateSteps.FINISHED);
    return new Moment(
      response.id,
      response.author,
      response.createdOn,
      response.dropId,
      // We will always have a gateway because we wait for the media to be processed
      response.media.gateways!,
      response.tokenId,
    );
  }

  async fetch({
    limit,
    offset,
    id,
    createdOrder,
    token_id,
    drop_ids,
    from,
    to,
    author,
    idOrder,
    tokenIdOrder,
    dropIdOrder,
  }: FetchMomentsInput): Promise<PaginatedResult<Moment>> {
    const variables = {
      limit,
      offset,
      orderBy: filterUndefinedProperties({
        start_date: createdOrder,
        token_id: tokenIdOrder,
        drop_id: dropIdOrder,
        id: idOrder,
      }),
      where: {
        ...creatEqFilter('token_id', token_id),
        ...createInFilter('drop_id', drop_ids),
        ...createFilter('author', author),
        ...createBetweenFilter('created_on', from, to),
        ...creatEqFilter('id', id),
      },
    };

    const response = await this.CompassProvider.request<MomentsQueryResponse>(
      PAGINATED_MOMENTS_QUERY,
      variables,
    );

    const momentsResponse: Moment[] = response.data.moments.map(
      this.getMomentFromMomentResponse,
    );

    const result = new PaginatedResult<Moment>(
      momentsResponse,
      nextCursor(momentsResponse.length, limit, offset),
    );

    return result;
  }

  private getMomentFromMomentResponse(momentResponse: MomentResponse): Moment {
    return new Moment(
      momentResponse.id,
      momentResponse.author,
      new Date(momentResponse.created_on),
      momentResponse.drop_id,
      momentResponse.gateways,
      momentResponse.token_id,
    );
  }
}
