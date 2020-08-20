import { Passage } from './passage';

export const passageStub = new Passage(
  'title01',
  '\n#section-marker -Section_1-' +
  '\nOne two. Three.' +
  '' +
  '\n\n#section-marker -Section_2-' +
  '\nFour, five; six! Seven... eight?',
  [{x: 1, y: 1}, {x: 2, y: 2}]
);
export const passagesStub = [passageStub];
