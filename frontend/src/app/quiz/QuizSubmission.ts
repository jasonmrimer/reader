export class QuizSubmission {
  public answers: any;

  constructor(
    public passage: string,
    surveyData: any
  ) {
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
}
