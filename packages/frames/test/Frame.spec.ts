import { Frame, FrameAspectRatio, FrameButtonAction } from '../src';

const BASE_FRAME = new Frame({
  title: 'Hello World',
  image: 'https://placehold.co/600x600',
  aspectRatio: FrameAspectRatio.SQUARE,
  postUrl: 'https://poap.xyz',
});

const FRAME_WITH_BUTTONS = new Frame({
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

describe('Frame.toMetaTags', () => {
  it('should return the correct meta tags for a base frame', () => {
    expect(BASE_FRAME.toMetaTags()).toEqual([
      { property: 'og:title', content: 'Hello World' },
      { property: 'og:image', content: 'https://placehold.co/600x600' },
      { name: 'fc:frame', content: 'vNext' },
      { name: 'fc:frame:image', content: 'https://placehold.co/600x600' },
      { name: 'fc:frame:image:aspect_ratio', content: '1:1' },
      { name: 'fc:frame:post_url', content: 'https://poap.xyz' },
    ]);
  });

  it('should return the correct meta tags for a frame with buttons', () => {
    expect(FRAME_WITH_BUTTONS.toMetaTags()).toEqual([
      { property: 'og:title', content: 'Hello World' },
      { property: 'og:image', content: 'https://placehold.co/600x600' },
      { name: 'fc:frame', content: 'vNext' },
      { name: 'fc:frame:image', content: 'https://placehold.co/600x600' },
      { name: 'fc:frame:image:aspect_ratio', content: '1:1' },
      { name: 'fc:frame:post_url', content: 'https://poap.xyz' },
      { name: 'fc:frame:button:1', content: 'Button 1' },
      { name: 'fc:frame:button:2', content: 'Button 2' },
      { name: 'fc:frame:button:2:action', content: FrameButtonAction.POST },
      { name: 'fc:frame:button:2:target', content: 'https://poap.xyz' },
      { name: 'fc:frame:button:3', content: 'Button 3' },
      { name: 'fc:frame:button:3:action', content: FrameButtonAction.LINK },
      { name: 'fc:frame:button:3:target', content: 'https://poap.xyz' },
    ]);
  });
});

describe('Frame.render', () => {
  it('should return the correct HTML for a base frame', () => {
    const expectedHTML = [
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '<title>Hello World</title>',
      '<meta property="og:title" content="Hello World" />',
      '<meta property="og:image" content="https://placehold.co/600x600" />',
      '<meta name="fc:frame" content="vNext" />',
      '<meta name="fc:frame:image" content="https://placehold.co/600x600" />',
      '<meta name="fc:frame:image:aspect_ratio" content="1:1" />',
      '<meta name="fc:frame:post_url" content="https://poap.xyz" />',
      '</head>',
      '<body><img src="https://placehold.co/600x600" alt="Hello World" /></body>',
      '</html>',
    ];
    expect(BASE_FRAME.render()).toBe(expectedHTML.join(''));
  });

  it('should return the correct HTML for a frame with buttons', () => {
    const expectedHTML = [
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '<title>Hello World</title>',
      '<meta property="og:title" content="Hello World" />',
      '<meta property="og:image" content="https://placehold.co/600x600" />',
      '<meta name="fc:frame" content="vNext" />',
      '<meta name="fc:frame:image" content="https://placehold.co/600x600" />',
      '<meta name="fc:frame:image:aspect_ratio" content="1:1" />',
      '<meta name="fc:frame:post_url" content="https://poap.xyz" />',
      '<meta name="fc:frame:button:1" content="Button 1" />',
      '<meta name="fc:frame:button:2" content="Button 2" />',
      '<meta name="fc:frame:button:2:action" content="post" />',
      '<meta name="fc:frame:button:2:target" content="https://poap.xyz" />',
      '<meta name="fc:frame:button:3" content="Button 3" />',
      '<meta name="fc:frame:button:3:action" content="link" />',
      '<meta name="fc:frame:button:3:target" content="https://poap.xyz" />',
      '</head>',
      '<body><img src="https://placehold.co/600x600" alt="Hello World" /></body>',
      '</html>',
    ];
    expect(FRAME_WITH_BUTTONS.render()).toBe(expectedHTML.join(''));
  });
});
