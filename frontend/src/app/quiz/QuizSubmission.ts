export class QuizSubmission {
  public answers: any;

  constructor(
    public quizId: string,
    surveyData: any
  ) {
    this.answers = this.convertDataToAnswers(surveyData);
  }

  private convertDataToAnswers(surveyData: any) {
    return surveyData.map((obj) => {
      let key = Object.keys(obj)[0];
      return {
        question: key,
        answer: obj[key]
      }
    })
  }
}
