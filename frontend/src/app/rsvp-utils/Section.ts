export class Section {
  constructor(
    public startIndex,
    public endIndex
  ) {

  }

  get length() {
    return this.endIndex - this.startIndex + 1;
  }
}
