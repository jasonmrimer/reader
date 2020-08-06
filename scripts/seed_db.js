const conn = new Mongo();
const db = conn.getDB('reader');
const filePathPassageTest1 = pwd() + '/models/passageTest1';
const filePathPassageTest2 = pwd() + '/models/passageTest2';
const filePathPassageTest3 = pwd() + '/models/passageTest3';
const filePathPassageTest4 = pwd() + '/models/passageTest4';
const filePathPassageTest5 = pwd() + '/models/passageTest5';
const filePathPassage1 = pwd() + '/models/passage1';
const filePathPassage2 = pwd() + '/models/passage2';
const filePathPassage3 = pwd() + '/models/passage3';
const filePathPassage4 = pwd() + '/models/passage4';
const filePathPassage5 = pwd() + '/models/passage5';

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
    content: cat(filePathPassage5),
    coordinates: [
      {x: 0, y: 0},
      {x: -121.7, y: 39.6},
      {x: -302.8, y: 220.6},
      {x: -47.4, y: 202.7},
      {x: -172.6, y: 176.1},
    ]
  }
);
db.quizzes.insert(  {
  passage: 1,
  questions: [
    {
      question: 'Where did scientists at Colorado State University and the U.S. National Park Service analyze noise levels for a study?',
      choices: [
        {correct: false, text: 'in cities across the U.S.'},
        {correct: false, text: 'in rural areas across the U.S.'},
        {correct: true, text: 'in federal, state, and local parks'},
        {correct: false, text: 'in areas by the ocean'},
      ]
    },
    {
      question: 'The levels of noise in many protected areas has been raised above the level of background noise. What is one cause of this increased noise the text describes?',
      choices: [
        {correct: false, text: 'Some animals have become louder.'},
        {correct: true, text: 'There are aircraft and road traffic nearby.'},
        {correct: false, text: 'Background noise has dropped.'},
        {correct: false, text: 'The number of thunderstorms has increased.'},
      ]
    },
    {
      question: 'Noise pollution can be harmful to wildlife in protected areas. What evidence from the text supports this conclusion?',
      choices: [
        {
          correct: false,
          text: 'The number of flights over the Grand Canyon has increased, with sound levels in spots reaching as high as 76 decibels.'
        },
        {
          correct: false,
          text: 'The noises humans make has raised the noise levels in two-thirds of protected areas in the U.S.'
        },
        {
          correct: false,
          text: 'Natural sounds like birds warbling and the wind rustling in the trees can have benefits for humans.'
        },
        {
          correct: true,
          text: 'Noise pollution can muffle the sound of calls among wild birds, hindering their ability to hunt for food.'
        },
      ]
    },
    {
      question: 'How might the noise that humans make be affecting humans?',
      choices: [
        {correct: true, text: 'It may be negatively affecting our moods.'},
        {correct: false, text: 'It may be improving our cognitive abilities.'},
        {correct: false, text: 'It may be causing people trauma.'},
        {correct: false, text: 'It may be causing increased traffic.'},
      ]
    },
    {
      question: 'What is the main idea of this article?',
      choices: [
        {
          correct: false,
          text: 'Natural sounds have benefits for humans, and can lower stress, elevate mood, and boost cognitive abilities.'
        },
        {
          correct: true,
          text: 'Noise pollution from humans is invading protected natural areas, with negative effects on wildlife and people there.'
        },
        {
          correct: false,
          text: 'Noise pollution can have negative effects on wildlife, like deafening fish, scaring off animals, and muffling the calls birds make.'
        },
        {
          correct: false,
          text: 'While sounds in cities often exceed 65 decibels, sounds in natural settings are usually not higher than 40 decibels.'
        },
      ]
    },
    {
      question: 'Please read these sentences from the text.\n' +
        '"They calculated that the sounds people make[...] have raised the levels above natural background noise in two-thirds of U.S. protected areas, with adverse consequences for wildlife and for the 300 million or so people who seek the tranquil hush of park lands every year. \'The din of modern life extends into protected areas,\' said acoustic biologist Megan McKenna[.]"\n' +
        '\n' +
        'Based on these sentences, what does the word din mean? ', //todo location to see if remember this section
      choices: [
        {correct: false, text: 'stress'},
        {correct: false, text: 'nature'},
        {correct: false, text: 'quiet hush'},
        {correct: true, text: 'loud noise'},
      ]
    },
    {
      question: 'Choose the answer that best completes the sentence.\n' +
        'Psychologists are discovering that natural sounds have benefits for humans, ______ lowering stress, elevating mood, and boosting cognitive abilities.',
      choices: [
        {correct: false, text: 'therefore'},
        {correct: true, text: 'such as'},
        {correct: false, text: 'however'},
        {correct: false, text: 'consequently'},
      ]
    }
  ]
});
db.quizzes.insert(
  {
    passage: 2,
    questions: [
      {
        question: 'The passage most strongly suggests that researchers at the Martin Prosperity Institute share which assumption?',
        choices: [
          {
            correct: false,
            text: 'Employees who work from home are more valuable to their employers than employees who commute.'
          },
          {
            correct: true,
            text: 'Employees whose commutes are shortened will use the time saved to do additional productive work for their employers.'
          },
          {
            correct: false,
            text: 'Employees can conduct business activities, such as composing memos or joining conference calls, while commuting.'
          },
          {
            correct: false,
            text: 'Employees who have lengthy commutes tend to make more money than employees who have shorter commutes.'
          },
        ]
      },
      {
        question: 'As used in the first sentence of paragraph 5, “intense” most nearly means', //todo location question
        choices: [
          {correct: false, text: 'emotional.'},
          {correct: true, text: 'concentrated.'},
          {correct: false, text: 'brilliant.'},
          {correct: false, text: 'determined.'},
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
        question: 'The passage most strongly suggests that Adelita used which of the following to navigate her 9,000mile journey?',
        choices: [
          {correct: false, text: 'The current of the North Atlantic gyre'},
          {correct: false, text: 'Cues from electromagnetic coils designed by Putman and Lohmann'},
          {correct: true, text: 'The inclination and intensity of Earth’s magnetic field'},
          {correct: false, text: 'A simulated “magnetic signature” configured by Lohmann'}
        ]
      },
      {
        question: 'Which choice provides the best evidence for the answer to question 9?', //todo write location based on this
        choices: [
          {
            correct: false,
            text: '“In 1996, a loggerhead turtle called Adelita swam across 9,000 miles from Mexico to Japan, crossing the entire Pacific on her way”'
          },
          {
            correct: false,
            text: '“Using his coil-surrounded tank, Lohmann could mimic the magnetic field at different parts of the Earth’s surface”'
          },
          {
            correct: false,
            text: '“In the wild, they might well also use other landmarks like the position of the sea, sun and stars”'
          },
          {
            correct: true,
            text: '“Neither corresponds directly to either latitude or longitude, but together, they provide a ‘magnetic signature’ that tells the turtle where it is”'
          },
        ]
      },
      {
        question: 'As used in the second sentence of paragraph 1 (follow link), “tracked” most nearly means',
        choices: [
          {correct: false, text: 'searched for.'},
          {correct: false, text: 'traveled over.'},
          {correct: true, text: 'followed.'},
          {correct: false, text: 'hunted.'},
        ]
      },
      {
        question: 'Based on the passage, which choice best describes the relationship between Putman’s and Lohmann’s research?',
        choices: [
          {correct: false, text: 'Putman’s research contradicts Lohmann’s.'},
          {correct: true, text: 'Putman’s research builds on Lohmann’s.'},
          {correct: false, text: 'Lohmann’s research confirms Putman’s.'},
          {correct: false, text: 'Lohmann’s research corrects Putman’s.'},
        ]
      },
      {
        question: 'The author refers to reed warblers and sparrows (follow link to the first sentence of paragraph 7) primarily to', //todo
        choices: [
          {correct: false, text: 'contrast the loggerhead turtle’s migration patterns with those of other species.'},
          {correct: true, text: 'provide examples of species that share one of the loggerhead turtle’s abilities.'},
          {correct: false, text: 'suggest that most animal species possess some ability to navigate long distances.'},
          {
            correct: false,
            text: 'illustrate some ways in which the ability to navigate long distances can help a species.'
          },
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
        question: 'The stance Jordan takes in the passage is best described as that of',
        choices: [
          {correct: true, text: 'an idealist setting forth principles.'},
          {correct: false, text: 'an advocate seeking a compromise position.'},
          {correct: false, text: 'an observer striving for neutrality.'},
          {correct: false, text: 'a scholar researching a historical controversy.'},
        ]
      },
      {
        question: 'The main rhetorical effect of the series of three phrases in the fourth sentence of paragraph 1 is to', //todo location question
        choices: [
          {
            correct: true,
            text: 'convey with increasing intensity the seriousness of the threat Jordan sees to the Constitution.'
          },
          {
            correct: false,
            text: 'clarify that Jordan believes the Constitution was first weakened, then sabotaged, then broken.'
          },
          {
            correct: false,
            text: 'indicate that Jordan thinks the Constitution is prone to failure in three distinct ways.'
          },
          {correct: false, text: 'propose a three-part agenda for rescuing the Constitution from the current crisis.'},
        ]
      },
      {
        question: 'As used in the first sentence of paragraph 5, “channeled” most nearly means', // todo location   uestion
        choices: [
          {correct: false, text: 'worn.'},
          {correct: false, text: 'sent.'},
          {correct: true, text: 'constrained.'},
          {correct: false, text: 'siphoned.'},
        ]
      },
      {
        question: 'In the second through fourth sentences of paragraph 6, what is the most likely reason Jordan draws a distinction between two types of “parties”?', //todo location
        choices: [
          {correct: true, text: 'To counter the suggestion that impeachment is or should be about partisan politics'},
          {correct: false, text: 'To disagree with Hamilton’s claim that impeachment proceedings excite passions'},
          {
            correct: false,
            text: 'To contend that Hamilton was too timid in his support for the concept of impeachment'
          },
          {
            correct: false,
            text: 'To argue that impeachment cases are decided more on the basis of politics than on justice'
          },
        ]
      },
      {
        question: 'Which choice provides the best evidence for the answer to the previous question?', //todo
        choices: [
          {
            correct: false,
            text: '“It is wrong, I suggest, it is a misreading of the Constitution for any member here to assert that for a member to vote for an article of impeachment means that that member must be convinced that the President should be removed from offic,”.'
          },
          {
            correct: false,
            text: '“The division between the two branches of the legislature, the House and the Senate, assigning to the one the right to accuse and to the other the right to judge—the framers of this Constitution were very astut,”.'
          },
          {
            correct: true,
            text: '“The drawing of political lines goes to the motivation behind impeachment; but impeachment must proceed within the confines of the constitutional term ‘high crime[s] and misdemeanors’”.'
          },
          {
            correct: false,
            text: '“Congress has a lot to do: appropriations, tax reform, health insurance, campaign finance reform, housing, environmental protection, energy sufficiency, mass transportatio,”.'
          },
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
        question: 'Over the course of the passage, the main focus of the narrative shifts from the',
        choices: [
          {
            correct: false,
            text: 'reservations a character has about a person he has just met to a growing appreciation that character has of the person’s worth.'
          },
          {
            correct: false,
            text: 'ambivalence a character feels about his sensitive nature to the character’s recognition of the advantages of having profound emotions.'
          },
          {
            correct: true,
            text: 'intensity of feeling a character has for another person to the character’s concern that that intensity is not reciprocated.'
          },
          {
            correct: false,
            text: 'value a character attaches to the wonders of the natural world to a rejection of that sort of beauty in favor of human artistry.'
          },

        ]
      },
      {
        question: 'In the context of the passage, the author’s use of the phrase “her light step flying to keep time with his long stride” is primarily meant to convey the idea that', //todo write location question
        choices: [
          {correct: true, text: 'Ethan and Mattie share a powerful enthusiasm.'},
          {correct: false, text: 'Matte strives to match the speed at which Ethan works.'},
          {correct: false, text: 'Mattie and Ethan playfully compete with each other.'},
          {correct: false, text: 'Ethan walks at a pace that frustrates Mattie.'},
        ]
      },
      {
        question: 'The description in the first paragraph indicates that what Ethan values most about Mattie is her',
        choices: [
          {correct: false, text: 'fitness for farm labor.'},
          {correct: false, text: 'vivacious youth.'},
          {correct: true, text: 'receptive nature.'},
          {correct: false, text: 'freedom from worry.'},
        ]
      }, //todo location
      {
        question: 'The author includes the descriptions of the sunset, the clouds, and the hemlock shadows primarily to', // todo write location question
        choices: [
          {correct: false, text: 'suggest the peacefulness of the natural world.'},
          {correct: true, text: 'emphasize the acuteness of two characters’ sensations.'},
          {correct: false, text: 'foreshadow the declining fortunes of two characters.'},
          {correct: false, text: 'offer a sense of how fleeting time can be.'},
        ]
      }
    ]
  }
);
