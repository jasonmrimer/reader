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
