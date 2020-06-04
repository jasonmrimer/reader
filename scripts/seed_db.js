conn = new Mongo();
db = conn.getDB('reader');
filePath = pwd() + '/models/passage01';
db.passages.insert(
  {
    title: 'For SpaceX, Third Launch is Charm',
    content: cat(filePath)
  }
);
db.quizzes.insert(
  {
    passage: 'spacex',
    questions: [
      {
        question: 'what is a red mammal?',
        answers: [
          {correct: true, answer: 'fox'},
          {correct: false, answer: 'skunk'},
          {correct: false, answer: 'panda'},
          {correct: false, answer: 'elephant'}
        ]
      },
      {
        question: 'what is the capitol of Maine?',
        answers: [
          {correct: false, answer: 'Montpelier'},
          {correct: false, answer: 'Nova Scotia'},
          {correct: true, answer: 'Augusta'},
          {correct: false, answer: 'Richmond'}
        ]
      },
    ]
  }
);