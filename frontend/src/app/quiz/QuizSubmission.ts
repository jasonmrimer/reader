import { User } from '../session/User';

export class QuizSubmission {
  public answers: any;

  constructor(
    public passage: string,
    surveyData: any,
    public interfaceName: string,
    public user: User,
    public date: Date
  ) {
    this.answers = this.convertDataToAnswers(surveyData);
  }

  private convertDataToAnswers(surveyData: any) {
    const keys = Object.keys(surveyData);
    return keys.map((key: string) => {
      return {
        question: key,
        answer: surveyData[key]
      };
    });
  }
}
