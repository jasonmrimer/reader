export const SECTION_META_NON_CONTENT_LENGTH = ['Section_Number'].length;

export class Section {
  constructor(
    public rank: number = -1,
    public start: number,
    public end: number,
    public percentRead: number
  ) {
  }

  get length() {
    return this.end - this.start - SECTION_META_NON_CONTENT_LENGTH;
  }
}
