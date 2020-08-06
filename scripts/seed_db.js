conn = new Mongo();
db = conn.getDB('reader');
filePathPassageTest1 = pwd() + '/models/passageTest1';
filePathPassageTest2 = pwd() + '/models/passageTest2';
filePathPassageTest3 = pwd() + '/models/passageTest3';
filePathPassageTest4 = pwd() + '/models/passageTest4';
filePathPassageTest5 = pwd() + '/models/passageTest5';
filePathPassage1 = pwd() + '/models/passage1';
filePathPassage2 = pwd() + '/models/passage2';
filePathPassage3 = pwd() + '/models/passage3';
filePathPassage4 = pwd() + '/models/passage4';
filePathPassage5 = pwd() + '/models/passage5';
db.passages.insert(
  {
    _id: '1',
    title: 'Noisy Humans Drown Out Sounds of Nature in Protected Areas',
    content: cat(filePathPassage1),
    coordinates: [
      {x: 0, y: 0},
      {x: -285.3, y: 92.7},
      {x: -559.7, y: 367.1},
      {x: 138.6, y: 318.2},
      {x: 64.3, y: 302.4},
    ]
  }
);
db.passages.insert(
  {
    _id: '2',
    title: 'The Great Reset',
    content: cat(filePathPassage2),
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
    title: 'Turtles Use the Earth\'s Magnetic Field as Global GPS',
    content: cat(filePathPassage3),
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
    title: 'Congresswoman Barbara Jordan on Impeachment',
    content: cat(filePathPassage4),
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
    title: 'Ethan Frome\'s Household Employee',
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
    passage: -1,
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
    passage: -2,
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
    passage: -3,
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
    passage: -4,
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
    passage: -5,
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
