export class PassageMetric {
  constructor(
    public user: string,
    public date: Date,
    public interfaceName: string,
    public completionCount: number
  ) {
  }
}
