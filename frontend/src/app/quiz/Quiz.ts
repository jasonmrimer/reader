export class Quiz {
  constructor(
    public questions: Question[]
  ) {
  }
}

export class Question {
  constructor(
    public question: string,
    public answers: Answer[]
  ) {
  }
}

export class Answer {
  constructor(
    public answer: string,
    public correct: boolean
  ) {
  }
}

export const quizStub = new Quiz(
  [
    new Question(
      "question1",
      [
        new Answer('answer1.1', true),
        new Answer('answer1.2', false),
        new Answer('answer1.3', false),
        new Answer('answer1.4', false)
      ]
    ),
    new Question(
      "question2",
      [
        new Answer('answer2.1', false),
        new Answer('answer2.2', true),
        new Answer('answer2.3', false),
        new Answer('answer2.4', false)
      ]
    )
  ]
)
