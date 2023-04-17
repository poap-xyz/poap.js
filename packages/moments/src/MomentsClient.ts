import { PoapMomentsApi } from '@poap-xyz/providers';
import { createMomentInput } from './types';
import { Moment } from './domain/Moment';

export class MomentsClient {
  constructor(private PoapMomentsApi: PoapMomentsApi) {}

  async createMoment(input: createMomentInput): Promise<Moment> {
    const { url, key } = await this.PoapMomentsApi.getSignedUrl();
    await this.PoapMomentsApi.uploadFile(input.file, url);
    await this.PoapMomentsApi.waitForMediaProcessing(key);
    const response = await this.PoapMomentsApi.createMoment({
      dropId: input.dropId,
      author: input.author,
      mediaKey: key,
      mimeType: input.mimeType,
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
}
