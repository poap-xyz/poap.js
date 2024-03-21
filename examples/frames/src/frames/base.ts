import { Frame, FrameAspectRatio } from '@poap-xyz/frames';

export const BASE_FRAME = new Frame({
  title: 'Hello World',
  image: 'https://placehold.co/600x600',
  aspectRatio: FrameAspectRatio.SQUARE,
  postUrl: 'https://poap.xyz',
});
