conn = new Mongo();
db = conn.getDB('reader');
filePathPassageTest = pwd() + '/models/passageTest';
filePathPassage01 = pwd() + '/models/passage01';
db.passages.insert(
  {
    _id: '0',
    title: 'Test Passage',
    content: cat(filePathPassageTest)
  }
);
db.passages.insert(
  {
    _id: '1',
    title: 'For SpaceX, Third Launch is Charm',
    content: cat(filePathPassage01)
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