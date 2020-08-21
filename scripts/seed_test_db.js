const conn = new Mongo();
const db = conn.getDB('reader');
const filePathPassageTest1 = pwd() + '/models/passageTest1';
const filePathPassageTest2 = pwd() + '/models/passageTest2';
const filePathPassageTest3 = pwd() + '/models/passageTest3';
const filePathPassageTest4 = pwd() + '/models/passageTest4';
const filePathPassageTest5 = pwd() + '/models/passageTest5';
db.passages.insert(
  {
    _id: '1',
    title: 'Test Passage',
    content: cat(filePathPassageTest1),
    coordinates: [
      {x: 0, y: 0},
      {x: -121.7, y: 39.6},
      {x: -302.8, y: 220.6},
      {x: -47.4, y: 202.7},
      {x: -172.6, y: 176.1},
    ]
  }
);
db.passages.insert(
  {
    _id: '2',
    title: 'Test Passage',
    content: cat(filePathPassageTest2),
    coordinates: [
      {x: 0, y: 0},
      {x: -121.7, y: 39.6},
      {x: -302.8, y: 220.6},
      {x: -47.4, y: 202.7},
      {x: -172.6, y: 176.1},
    ]
  }
);
db.passages.insert(
  {
    _id: '3',
    title: 'Test Passage',
    content: cat(filePathPassageTest3),
    coordinates: [
      {x: 0, y: 0},
      {x: -121.7, y: 39.6},
      {x: -302.8, y: 220.6},
      {x: -47.4, y: 202.7},
      {x: -172.6, y: 176.1},
    ]
  }
);
db.passages.insert(
  {
    _id: '4',
    title: 'Test Passage',
    content: cat(filePathPassageTest4),
    coordinates: [
      {x: 0, y: 0},
      {x: -121.7, y: 39.6},
      {x: -302.8, y: 220.6},
      {x: -47.4, y: 202.7},
      {x: -172.6, y: 176.1},
    ]
  }
);
db.passages.insert(
  {
    _id: '5',
    title: 'Test Passage',
    content: cat(filePathPassageTest5),
    coordinates: [
      {x: 0, y: 0},
      {x: -121.7, y: 39.6},
      {x: -302.8, y: 220.6},
      {x: -47.4, y: 202.7},
      {x: -172.6, y: 176.1},
    ]
  }
);
db.quizzes.insert(
  {
    passage: 1,
    questions: [
      {
        question: 'quiz 1 what is a red mammal?',
        isLocationBased: true,
        choices: [
          {correct: true, text: 'fox'},
          {correct: false, text: 'skunk'},
          {correct: false, text: 'panda'},
          {correct: false, text: 'elephant'}
        ]
      },
      {
        question: 'what is the capitol of Maine?',
        isLocationBased: false,
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
db.quizzes.insert(
  {
    passage: 2,
    questions: [
      {
        question: 'quiz 2 what is a red mammal?',
        isLocationBased: true,
        choices: [
          {correct: true, text: 'fox'},
          {correct: false, text: 'skunk'},
          {correct: false, text: 'panda'},
          {correct: false, text: 'elephant'}
        ]
      },
      {
        question: 'what is the capitol of Maine?',
        isLocationBased: false,
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
db.quizzes.insert(
  {
    passage: 3,
    questions: [
      {
        question: 'quiz 3 what is a red mammal?',
        isLocationBased: true,
        choices: [
          {correct: true, text: 'fox'},
          {correct: false, text: 'skunk'},
          {correct: false, text: 'panda'},
          {correct: false, text: 'elephant'}
        ]
      },
      {
        question: 'what is the capitol of Maine?',
        isLocationBased: false,
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
db.quizzes.insert(
  {
    passage: 4,
    questions: [
      {
        question: 'quiz 4 what is a red mammal?',
        isLocationBased: true,
        choices: [
          {correct: true, text: 'fox'},
          {correct: false, text: 'skunk'},
          {correct: false, text: 'panda'},
          {correct: false, text: 'elephant'}
        ]
      },
      {
        question: 'what is the capitol of Maine?',
        isLocationBased: false,
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
db.quizzes.insert(
  {
    passage: 5,
    questions: [
      {
        question: 'quiz 5 what is a red mammal?',
        isLocationBased: true,
        choices: [
          {correct: true, text: 'fox'},
          {correct: false, text: 'skunk'},
          {correct: false, text: 'panda'},
          {correct: false, text: 'elephant'}
        ]
      },
      {
        question: 'what is the capitol of Maine?',
        isLocationBased: false,
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
