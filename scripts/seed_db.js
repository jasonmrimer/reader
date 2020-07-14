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
      {x: -285.3, y:	92.7},
      {x: -559.7, y:	367.1},
      {x: 138.6, y:	318.2},
      {x: 64.3, y:	302.4},
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
