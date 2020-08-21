export const SECTION_META_NON_CONTENT_LENGTH = ['Section_Number'].length;

export class Section {
  constructor(
    public rank: number = -1,
    public startIndex: number,
    public contentStartIndex: number,
    public endIndex: number,
    public percentRead: number
  ) {
  }

  get actualContentLength() {
    return this.endIndex - this.contentStartIndex + 1;
  }
}
