import { QuizSubmission } from './QuizSubmission';

describe('QuizSubmission', () => {
  it('should receive survey data and transform into choices for db', () => {
    const surveyData =
      {
        q1: 'a1',
        q2: 'a2'
      }

    const quizSubmission = new QuizSubmission('qId', surveyData, "", "fakeUser", new Date());

    expect(quizSubmission.passage).toEqual('qId');
    expect(quizSubmission.answers).toEqual([
      {question: 'q1', answer: 'a1'},
      {question: 'q2', answer: 'a2'},
    ]);
  });
});
