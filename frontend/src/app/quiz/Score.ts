export class Score {
  constructor(
    public passageId: string,
    public interfaceName: string,
    public correct: number,
    public total: number
  ) {
  }
}
