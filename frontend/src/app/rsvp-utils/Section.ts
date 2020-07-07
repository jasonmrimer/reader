export class Section {
  constructor(
    public rank: number = -1,
    public start: number,
    public end: number
  ) {

  }

  get length() {
    return this.end - this.start + 1;
  }
}
