import { CompassProvider, PoapMomentsApi } from '@poap-xyz/providers';
import {
  createBetweenFilter,
  createEqFilter,
  createInFilter,
  createLikeFilter,
  createOrderBy,
  nextCursor,
  PaginatedResult,
} from '@poap-xyz/utils';
import { Moment } from '../domain/Moment';
import {
  MomentsQueryResponse,
  MomentsQueryVariables,
  PAGINATED_MOMENTS_QUERY,
} from '../queries/PaginatedMoments';
import { CreateMedia } from './dtos/create/CreateMedia';
import { CreateMomentInput } from './dtos/create/CreateInput';
import { CreateSteps } from './dtos/create/CreateSteps';
import { FetchMomentsInput } from './dtos/fetch/FetchMomentsInput';
import { MomentsSortFields } from './dtos/fetch/MomentsSortFields';
import { CreateAndUploadMomentInput } from './dtos/create/CreateAndUploadInput';

export class MomentsClient {
  constructor(
    private poapMomentsApi: PoapMomentsApi,
    private CompassProvider: CompassProvider,
  ) {}

  /** Uploads media files first, then creates the Moment. */
  public async createMomentAndUploadMedia(
    input: CreateAndUploadMomentInput,
  ): Promise<Moment> {
    let mediaKeys: string[] = [];
    if (input.media && input.media.length > 0) {
      mediaKeys = await this.uploadMediaList(
        input.media,
        input.onStepUpdate,
        input.onFileUploadProgress,
        input.timeOut,
      );
    }

    if (mediaKeys.length > 0) {
      await this.awaitForMediaProcessing(
        mediaKeys,
        input.onStepUpdate,
        input.timeOut,
      );
    }

    return this.createMoment({ ...input, mediaKeys });
  }

  /** Creates the Moment, attaching previously uploaded media when applicable. */
  public async createMoment(input: CreateMomentInput): Promise<Moment> {
    void input.onStepUpdate?.(CreateSteps.UPLOADING_MOMENT);
    const response = await this.poapMomentsApi.createMoment({
      dropIds: input.dropIds,
      author: input.author,
      description: input.description,
      mediaKeys: input.mediaKeys || [],
    });
    void input.onStepUpdate?.(CreateSteps.FINISHED);

    return Moment.fromCreated(response);
  }

  // eslint-disable-next-line max-statements
  public async uploadMediaList(
    mediaArray: CreateMedia[],
    onStepUpdate?: (step: CreateSteps) => void | Promise<void>,
    onFileUploadProgress?: (progress: number) => void | Promise<void>,
    timeOut?: number,
  ): Promise<string[]> {
    void onStepUpdate?.(CreateSteps.UPLOADING_MEDIA);
    const mediaKeys: string[] = [];
    const progressPerMedia = 1 / mediaArray.length;
    let progress = 0;

    for (const media of mediaArray) {
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

  public async awaitForMediaProcessing(
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

    await this.poapMomentsApi.waitForMediaProcessing(key, timeOut);

    return key;
  }

  async fetch({
    limit,
    offset,
    id,
    createdOrder,
    drop_ids,
    from,
    to,
    author,
    idOrder,
  }: FetchMomentsInput): Promise<PaginatedResult<Moment>> {
    const variables: MomentsQueryVariables = {
      limit,
      offset,
      orderBy: {
        ...createOrderBy<MomentsSortFields>(
          MomentsSortFields.StartDate,
          createdOrder,
        ),
        ...createOrderBy<MomentsSortFields>(MomentsSortFields.Id, idOrder),
      },
      where: {
        ...createInFilter('drop_id', drop_ids),
        ...createLikeFilter('author', author),
        ...createBetweenFilter('created_on', from, to),
        ...createEqFilter('id', id),
      },
    };

    const response = await this.CompassProvider.request<
      MomentsQueryResponse,
      MomentsQueryVariables
    >(PAGINATED_MOMENTS_QUERY, variables);

    const momentsResponse: Moment[] = response.data.moments.map((moment) =>
      Moment.fromCompass(moment),
    );

    const result = new PaginatedResult<Moment>(
      momentsResponse,
      nextCursor(momentsResponse.length, limit, offset),
    );

    return result;
  }
}
