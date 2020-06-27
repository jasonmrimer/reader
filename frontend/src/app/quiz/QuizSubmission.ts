export class QuizSubmission {
  public answers: any;
  private readonly _interfaceName: string;

  constructor(
    public passage: string,
    surveyData: any
    ,
    interfaceName: string
  ) {
    this._interfaceName = interfaceName;
    this.answers = this.convertDataToAnswers(surveyData);
  }

  private convertDataToAnswers(surveyData: any) {
    let keys = Object.keys(surveyData);
    return keys.map((key: string) => {
      return {
        question: key,
        answer: surveyData[key]
      }
    })
  }

  get interfaceName(): string {
    return this._interfaceName;
  }
}
