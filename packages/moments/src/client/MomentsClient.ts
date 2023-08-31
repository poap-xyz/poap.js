import { CompassProvider, PoapMomentsApi } from '@poap-xyz/providers';
import {
  createBetweenFilter,
  createFilter,
  createInFilter,
  creatEqFilter,
  filterUndefinedProperties,
  nextCursor,
  PaginatedResult,
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
  constructor(
    private poapMomentsApi: PoapMomentsApi,
    private CompassProvider: CompassProvider,
  ) {}

  public async createMoment(input: CreateMomentInput): Promise<Moment> {
    let mediaKeys: string[] = [];
    if (input.medias && input.medias.length > 0) {
      mediaKeys = await this.uploadMedias(
        input.medias,
        input.onStepUpdate,
        input.onFileUploadProgress,
        input.timeOut,
      );
    }

    if (mediaKeys.length > 0) {
      await this.awaitForMediasProcessing(
        mediaKeys,
        input.onStepUpdate,
        input.timeOut,
      );
    }

    void input.onStepUpdate?.(CreateSteps.UPLOADING_MOMENT);
    const response = await this.poapMomentsApi.createMoment({
      dropId: input.dropId,
      author: input.author,
      tokenId: input.tokenId,
      description: input.description,
      mediaKeys,
    });

    void input.onStepUpdate?.(CreateSteps.FINISHED);
    return new Moment(
      response.id,
      response.author,
      response.createdOn,
      response.dropId,
      response.tokenId,
      response.description,
    );
  }

  private async uploadMedias(
    medias: CreateMedia[],
    onStepUpdate?: (step: CreateSteps) => void | Promise<void>,
    onFileUploadProgress?: (progress: number) => void | Promise<void>,
    timeOut?: number,
  ): Promise<string[]> {
    void onStepUpdate?.(CreateSteps.UPLOADING_MEDIA);
    const mediaKeys: string[] = [];
    const progressPerMedia = 1 / medias.length;
    let progress = 0;

    for (const media of medias) {
      const mediaOnFileUploadProgress = (mediaProgress: number): void => {
        const totalProgress = progressPerMedia * mediaProgress + progress;
        void onFileUploadProgress?.(totalProgress);
      };
      const key = await this.uploadMedia(
        media,
        mediaOnFileUploadProgress,
        timeOut,
      );
      mediaKeys.push(key);
      progress += progressPerMedia;
      void onFileUploadProgress?.(progress);
    }

    return mediaKeys;
  }

  private async awaitForMediasProcessing(
    mediaKeys: string[],
    onStepUpdate?: (step: CreateSteps) => void | Promise<void>,
    timeOut?: number,
  ): Promise<void> {
    void onStepUpdate?.(CreateSteps.PROCESSING_MEDIA);
    const promises: Promise<void>[] = [];

    for (const key of mediaKeys) {
      promises.push(this.poapMomentsApi.waitForMediaProcessing(key, timeOut));
    }

    try {
      await Promise.all(promises);
    } catch (error) {
      void onStepUpdate?.(CreateSteps.PROCESSING_MEDIA_ERROR);
      throw error;
    }
  }

  private async uploadMedia(
    media: CreateMedia,
    onFileUploadProgress?: (progress: number) => void | Promise<void>,
    timeOut?: number,
  ): Promise<string> {
    const { url, key } = await this.poapMomentsApi.getSignedUrl();
    await this.poapMomentsApi.uploadFile(
      media.fileBinary,
      url,
      media.fileType,
      onFileUploadProgress,
    );
    try {
      await this.poapMomentsApi.waitForMediaProcessing(key, timeOut);
    } catch (error) {
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
