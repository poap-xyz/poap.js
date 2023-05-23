import { PoapMomentsApi, CompassProvider } from '@poap-xyz/providers';
import { PaginatedResult, nextCursor } from '@poap-xyz/utils';
import { CreateMomentInput, FetchMomentsInput } from './types';
import { Moment } from './domain/Moment';
import {
  createBetweenFilter,
  createFilter,
  createInFilter,
  creatEqFilter,
  filterUndefinedProperties,
} from './queries/utils';
import {
  MomentResponse,
  MomentsQueryResponse,
  PAGINATED_MOMENTS_QUERY,
} from './queries';

export class MomentsClient {
  constructor(
    private PoapMomentsApi: PoapMomentsApi,
    private CompassProvider: CompassProvider,
  ) {}

  async createMoment(input: CreateMomentInput): Promise<Moment> {
    const { url, key } = await this.PoapMomentsApi.getSignedUrl();
    await this.PoapMomentsApi.uploadFile(input.file, url, input.fileType);
    await this.PoapMomentsApi.waitForMediaProcessing(key, input.timeOut);
    const response = await this.PoapMomentsApi.createMoment({
      dropId: input.dropId,
      author: input.author,
      mediaKey: key,
      tokenId: input.tokenId,
    });
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
