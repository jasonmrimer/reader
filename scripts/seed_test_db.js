conn = new Mongo();
db = conn.getDB('reader');
filePathPassageTest1 = pwd() + '/models/passageTest1';
filePathPassageTest2 = pwd() + '/models/passageTest2';
filePathPassageTest3 = pwd() + '/models/passageTest3';
filePathPassageTest4 = pwd() + '/models/passageTest4';
filePathPassageTest5 = pwd() + '/models/passageTest5';
filePathPassage1 = pwd() + '/models/passage1';
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
db.quizzes.insert(
  {
    passage: 2,
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
db.quizzes.insert(
  {
    passage: 3,
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
db.quizzes.insert(
  {
    passage: 4,
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
db.quizzes.insert(
  {
    passage: 5,
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
