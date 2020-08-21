const express = require('express');
const router = express.Router();

const passage = require('../models/passage.js');
const quiz = require('../models/quiz.js');
const submission = require('../models/submission.js');
const passageMetric = require('../models/passageMetric.js');
const user = require('../models/user.js');

router.post('/user', (request, response, next) => {
  let newUser = new user({
    id: request.body.id,
    experience: request.body.experience,
    education: request.body.education,
    age: request.body.age,
  })

  newUser.save((err, sub) => {
    if (err) {
      response.send(err);
    } else {
      response.send(sub)
    }
  })
});

router.get('/passage', (request, response, next) => {
  const id = request.query.id;

  passage.findById(id,
    function (err, psg) {
      if (err) {
        console.error('Error retrieving passage by id');
      } else {
        response.json(psg);
      }
    }
  );
});

router.get('/quiz', (request, response, next) => {
  const id = request.query.id;
  quiz.find(
    {passage: id},
    (err, quiz) => {
      if (err) {
        console.error('Error retrieving quiz by id');
      } else {
        response.json(quiz);
      }
    }
  )

});
router.get('/quizzes', (request, response, next) => {
  quiz.find((err, quizzes) => {
    response.json(quizzes);
  })
});

router.post('/quizzes', (request, response, next) => {
  let newSubmission = new submission({
      quizId: request.body.passageId,
      answers: request.body.answers,
      interface: request.body.interfaceName,
      user: request.body.user,
      date: request.body.date
    }
  )
  newSubmission.save((err, sub) => {
    if (err) {
      response.send(err);
    } else {
      response.send(sub);
    }
  })
});

router.get('/metrics-passage', (request, response, next) => {
  const aggregatorOptions = [
    {
      $group: {
        _id: "$interfaceName",
        count: {$sum: 1}
      },
    },
  ]

  passageMetric.aggregate(aggregatorOptions, function (err, sum) {
    if (err) {
      response.send(err);
    } else {
      response.send(sum);
    }
  })
});

router.post('/metrics-passage', (request, response, next) => {
  let newMetric = new passageMetric({
    user: request.body.user,
    date: request.body.date,
    interfaceName: request.body.interfaceName,
  })

  newMetric.save((err, sub) => {
    if (err) {
      response.send(err);
    } else {
      response.send(sub)
    }
  })
});

router.get('/metrics-quiz', (request, response, next) => {
  submission.find((err, submissions) => {
    const interfaceOccurrences = submissions.map(submission => {
      return submission.interface;
    });
    const interfaceTypes = [...new Set(interfaceOccurrences)];
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    let counts = interfaceTypes.map(type => {
      return {interfaceName: type, quizCount: countOccurrences(interfaceOccurrences, type)}
    });
    response.json(counts);
  });
});

module.exports = router;
