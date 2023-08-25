import { PoapMomentsApi, CompassProvider } from '@poap-xyz/providers';
import {
  PaginatedResult,
  nextCursor,
  createBetweenFilter,
  createFilter,
  createInFilter,
  creatEqFilter,
  filterUndefinedProperties,
} from '@poap-xyz/utils';
import { Moment } from '../domain/Moment';
import {
  MomentResponse,
  MomentsQueryResponse,
  PAGINATED_MOMENTS_QUERY,
} from '../queries';
import { CreateMomentInput } from './dtos/create/CreateInput';
import { CreateSteps } from './dtos/create/CreateSteps';
import { FetchMomentsInput } from './dtos/fetch/FetchMomentsInput';
import { CreateMedia } from './dtos/create/CreateMedia';

export class MomentsClient {
  private static readonly DEFAULT_ON_STEP_UPDATE = (): void => {
    //do nothing
  };

  constructor(
    private poapMomentsApi: PoapMomentsApi,
    private CompassProvider: CompassProvider,
  ) {}

  public async createMoment(input: CreateMomentInput): Promise<Moment> {
    if (input.medias && input.medias.length > 1) {
      // TODO: implement multiple medias
      throw new Error('Multiple medias not supported yet');
    }

    const onStepUpdate =
      input.onStepUpdate || MomentsClient.DEFAULT_ON_STEP_UPDATE;

    const mediaKeys: string[] = [];
    if (input.medias && input.medias.length > 0) {
      const media = input.medias[0];
      const key = await this.createMedia(
        media,
        onStepUpdate,
        input.onFileUploadProgress,
        input.timeOut,
      );
      mediaKeys.push(key);
    }

    void onStepUpdate(CreateSteps.UPLOADING_MOMENT);
    const response = await this.poapMomentsApi.createMoment({
      dropId: input.dropId,
      author: input.author,
      tokenId: input.tokenId,
      description: input.description,
      mediaKeys,
    });
    void onStepUpdate(CreateSteps.FINISHED);
    return new Moment(
      response.id,
      response.author,
      response.createdOn,
      response.dropId,
      response.tokenId,
      response.description,
    );
  }

  private async createMedia(
    media: CreateMedia,
    onStepUpdate: (step: CreateSteps) => void | Promise<void>,
    onFileUploadProgress?: (progress: number) => void | Promise<void>,
    timeOut?: number,
  ): Promise<string> {
    void onStepUpdate(CreateSteps.REQUESTING_MEDIA_UPLOAD_URL);
    const { url, key } = await this.poapMomentsApi.getSignedUrl();
    void onStepUpdate(CreateSteps.UPLOADING_MEDIA);
    await this.poapMomentsApi.uploadFile(
      media.fileBinary,
      url,
      media.fileType,
      onFileUploadProgress,
    );
    void onStepUpdate(CreateSteps.UPLOADING_MEDIA_METADATA);
    //  we will be adding metadata to the media in the future
    void onStepUpdate(CreateSteps.PROCESSING_MEDIA);
    try {
      await this.poapMomentsApi.waitForMediaProcessing(key, timeOut);
    } catch (error) {
      void onStepUpdate(CreateSteps.PROCESSING_MEDIA_ERROR);
      throw error;
    }

    return key;
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
      momentResponse.token_id,
      momentResponse.description,
    );
  }
}
