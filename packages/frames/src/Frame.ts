import { MetaTag } from 'next-seo/lib/types';

export enum FrameAspectRatio {
  SQUARE = '1:1',
  WIDE = '1.91:1',
}

export enum FrameButtonAction {
  /**
   * The button will trigger a post request to the postUrl.
   * By default, the postUrl is used as the target URL if target is not provided.
   */
  POST = 'post',
  /**
   * The button will redirect to the target URL.
   */
  LINK = 'link',
}

export interface FrameButton {
  /**
   * The label to be displayed in the button.
   */
  label: string;
  /**
   * - post: The button will trigger a post request to the postUrl.
   * - link: The button will redirect to the target URL.
   * @default post
   */
  action?: FrameButtonAction;
  /**
   * A target URL for the button. It uses the postUrl if not provided.
   */
  target?: string;
}

interface FrameConstructorProps {
  /**
   * The title to be displayed in the frame. Required.
   */
  title: string;
  /**
   * The URL of the image to be displayed in the frame. It should be a URL. Required.
   */
  image: string;
  /**
   * The URL to be used in the post request. Required.
   */
  postUrl: string;
  /**
   * Aspect-ratio of the image. Required.
   */
  aspectRatio: FrameAspectRatio;
  /**
   * An ordered list of buttons to be displayed in the frame.
   */
  buttons?: FrameButton[];
}

/**
 * Represents a Farcaster frame.
 * Documentation: https://docs.farcaster.xyz/learn/what-is-farcaster/frames
 * Specification: https://docs.farcaster.xyz/reference/frames/spec
 */
export class Frame {
  /**
   * The title to be displayed in the frame. Required.
   */
  title: string;
  /**
   * The URL of the image to be displayed in the frame. It should be a URL. Required.
   */
  image: string;
  /**
   * The URL to be used in the post request. Required.
   */
  postUrl: string;
  /**
   * Aspect-ratio of the image. Required.
   */
  aspectRatio: FrameAspectRatio;
  /**
   * An ordered list of buttons to be displayed in the frame.
   */
  buttons?: FrameButton[];

  constructor(props: FrameConstructorProps) {
    this.title = props.title;
    this.image = props.image;
    this.postUrl = props.postUrl;
    this.aspectRatio = props.aspectRatio;
    this.buttons = props.buttons;
  }

  /**
   * Renders the frame as complete HTML markup.
   *
   * @example
   * export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   *   const frame = new Frame({ ... });
   *   return res.status(200).send(frame.render());
   * }
   *
   * @returns The HTML representation of the frame.
   */
  public render(): string {
    const metaTags = this.toMetaTags().map((tag) => Frame.renderTag(tag));

    return [
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      `<title>${this.title}</title>`,
      ...metaTags,
      '</head>',
      `<body><img src="${this.image}" alt="${this.title}" /></body>`,
      '</html>',
    ].join('');
  }

  /**
   * Generates the meta tags used for the frame.
   *
   * @example
   * const frame = useMemo(() => new Frame({ ... });
   * return (
   *   <>
   *     <NextSeo
   *       title="Hello World"
   *       description="..."
   *       openGraph={{ images: [...] }}
   *       additionalMetaTags={frame.toMetaTags()}
   *     />
   *     <div>...</div>
   *   </>
   * )
   *
   * @returns The meta tags.
   */
  public toMetaTags(): MetaTag[] {
    const tags: MetaTag[] = [
      { property: 'og:title', content: this.title },
      { property: 'og:image', content: this.image },
      { name: 'fc:frame', content: 'vNext' },
      { name: 'fc:frame:image', content: this.image },
      { name: 'fc:frame:image:aspect_ratio', content: this.aspectRatio },
    ];

    if (this.postUrl) {
      tags.push({ name: 'fc:frame:post_url', content: this.postUrl });
    }

    if (this.buttons) {
      this.buttons.forEach((button, index) => {
        tags.push({
          name: `fc:frame:button:${index + 1}`,
          content: button.label,
        });

        if (button.action) {
          tags.push({
            name: `fc:frame:button:${index + 1}:action`,
            content: button.action,
          });
        }

        if (button.target) {
          tags.push({
            name: `fc:frame:button:${index + 1}:target`,
            content: button.target,
          });
        }
      });
    }

    return tags;
  }

  private static renderTag(tag: MetaTag): string {
    const parts: string[] = ['<meta'];

    if (tag.name) {
      parts.push(`name="${tag.name}"`);
    }

    if (tag.property) {
      parts.push(`property="${tag.property}"`);
    }

    parts.push(`content="${tag.content}"`);

    parts.push('/>');

    return parts.join(' ');
  }
}
