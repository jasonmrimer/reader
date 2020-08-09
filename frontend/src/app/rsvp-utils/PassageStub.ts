import { Passage } from './passage';

export const passageStub = new Passage(
  'title01',
  '#section-marker\nOne two. Three.\n#section-marker\nFour, five; six!\n\nSeven... eight?',
  [{x: 1, y: 1}, {x: 2, y: 2}]
);
export const passagesStub = [passageStub];
