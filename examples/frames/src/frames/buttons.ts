import { Frame, FrameAspectRatio, FrameButtonAction } from '@poap-xyz/frames';

export const FRAME_WITH_BUTTONS = new Frame({
  title: 'Hello World',
  image: 'https://placehold.co/600x600',
  aspectRatio: FrameAspectRatio.SQUARE,
  postUrl: 'https://poap.xyz',
  buttons: [
    { label: 'Button 1' },
    {
      label: 'Button 2',
      action: FrameButtonAction.POST,
      target: 'https://poap.xyz',
    },
    {
      label: 'Button 3',
      action: FrameButtonAction.LINK,
      target: 'https://poap.xyz',
    },
  ],
});
