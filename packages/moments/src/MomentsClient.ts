import { PoapMomentsApi, CompassProvider } from '@poap-xyz/providers';
import { PaginatedResult, nextCursor } from '@poap-xyz/utils';
import { createMomentInput, FetchMomentsInput } from './types';
import { Moment } from './domain/Moment';
import {
  createBetweenFilter,
  createFilter,
  createInFilter,
  creatEqFilter,
  filterUndefinedProperties,
} from './queries/utils';
import { MomentsQueryResponse, PAGINATED_MOMENTS_QUERY } from './queries';
import { MediaStatus } from './domain/MediaStatus';

export class MomentsClient {
  constructor(
    private PoapMomentsApi: PoapMomentsApi,
    private CompassProvider: CompassProvider,
  ) {}

  async createMoment(input: createMomentInput): Promise<Moment> {
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
      response.media,
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

    const moments_response: Moment[] = response.data.moments.map((moment) => {
      return new Moment(
        moment.id,
        moment.author,
        new Date(moment.created_on),
        moment.drop_id,
        {
          key: moment.media_key,
          mimeType: moment.mime_type,
          status: MediaStatus.PROCESSED,
          hash: moment.media_hash,
        },
        moment.token_id,
      );
    });

    const result = new PaginatedResult<Moment>(
      moments_response,
      nextCursor(moments_response.length, limit, offset),
    );

    return result;
  }
}
