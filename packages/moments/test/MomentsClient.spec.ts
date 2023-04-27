import { Moment } from '../src/domain/Moment';
import { Media } from '../src/domain/Media';
import { MediaStatus } from '../src/domain/MediaStatus';

describe('Moment', () => {
  it('should create a Moment instance with the given properties', () => {
    const media = new Media('key', 'image/png', MediaStatus.PROCESSED, 'hash');
    const createdOn = new Date('2023-04-27T12:00:00Z');
    const moment = new Moment('id', 'author', createdOn, 1, media, 100);

    expect(moment.id).toBe('id');
    expect(moment.author).toBe('author');
    expect(moment.createdOn).toEqual(createdOn);
    expect(moment.dropId).toBe(1);
    expect(moment.media).toBe(media);
    expect(moment.tokenId).toBe(100);
  });
});
