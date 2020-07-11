conn = new Mongo();
db = conn.getDB('reader');
filePathPassageTest = pwd() + '/models/passageTest';
filePathPassage01 = pwd() + '/models/passage01';
db.passages.insert(
  {
    _id: '0',
    title: 'Test Passage',
    content: cat(filePathPassageTest),
    coordinates: [
      {x: 0, y: 0},
      {x: -15.6, y: 127.0},
      {x: 109.6, y: 153.7},
      {x: 170.1, y: 132.8},
    ]
  }
);
db.passages.insert(
  {
    _id: '1',
    title: 'For SpaceX, Third Launch is Charm',
    content: cat(filePathPassage01),
    coordinates: [
      {x: 0, y: 0},
      {x: -378.3, y: 3080.9},
      {x: 5099.3, y: 4245.2},
      {x: 5674.2, y: 4047.2},
    ]
  }
);
db.quizzes.insert(
  {
    passage: 'spacex',
    questions: [
      {
        question: 'what is a red mammal?',
        choices: [
          {correct: true, text: 'fox'},
          {correct: false, text: 'skunk'},
          {correct: false, text: 'panda'},
          {correct: false, text: 'elephant'}
        ]
      },
      {
        question: 'what is the capitol of Maine?',
        choices: [
          {correct: false, text: 'Montpelier'},
          {correct: false, text: 'Nova Scotia'},
          {correct: true, text: 'Augusta'},
          {correct: false, text: 'Richmond'}
        ]
      },
    ]
  }
);
