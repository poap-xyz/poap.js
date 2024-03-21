import dotenv from 'dotenv';
import { Frame } from '@poap-xyz/frames';
import { BASE_FRAME } from './frames/base';
import { FRAME_WITH_BUTTONS } from './frames/buttons';

dotenv.config();

function main(): void {
  runFrameExample('Base frame', BASE_FRAME);
  runFrameExample('Frame with buttons', FRAME_WITH_BUTTONS);
}

function runFrameExample(name: string, frame: Frame): void {
  console.log(name);
  console.log('meta tags:');
  console.log(frame.toMetaTags());
  console.log('full html:');
  console.log(frame.render());
  console.log('meta tags:');
  console.log(frame.renderMetaTags());
  console.log('---------');
}

main();
