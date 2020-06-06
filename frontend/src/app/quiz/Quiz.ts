export class Quiz {
  constructor(
    public passage: string,
    public questions: Question[]) {
  }
}

export class Question {
  constructor(
    public question: string,
    public choices: Choice[]
  ) {
  }
}

export class Choice {
  constructor(
    public text: string,
    public correct: boolean
  ) {
  }
}

let question1 = new Question(
  'question1',
  [
    new Choice('answer1.1', true),
    new Choice('answer1.2', false),
    new Choice('answer1.3', false),
    new Choice('answer1.4', false)
  ]
);

let question2 = new Question(
  'question2',
  [
    new Choice('answer2.1', false),
    new Choice('answer2.2', true),
    new Choice('answer2.3', false),
    new Choice('answer2.4', false)
  ]
);

export const quizStub = new Quiz(
  'id1',
  [question1, question2]
)

export const quizzesStub = [quizStub];
