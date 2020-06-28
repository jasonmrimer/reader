const express = require('express');
const router = express.Router();

const passage = require('../models/passage.js');
const quiz = require('../models/quiz.js');
const submission = require('../models/submission.js');
const passageMetric = require('../models/passageMetric.js');

router.get('/passages', (request, response, next) => {
    passage.find((err, passages) => {
        response.json(passages);
    })
});

router.get('/quizzes', (request, response, next) => {
    quiz.find((err, quizzes) => {
        response.json(quizzes);
    })
});

router.post('/quizzes', (request, response, next) => {
    let newSubmission  = new submission({
        quizId: request.body.passage,
        answers: request.body.answers,
        interface: request.body.interfaceName
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
    passageMetric.find((err, metrics) => {
        response.json(metrics);
    })
});

router.post('/metrics-passage', (request, response, next) => {
    let interfaceName = request.body.interfaceName;
    passageMetric.findOneAndUpdate(
      {interfaceName: interfaceName},
      {$inc: {'completionCount': 1}},
      {upsert: true, new: true},
      function(err, doc) {
          if (err) return response.send(500, {error: err});
          return response.send({message: 'Successfully saved.'});
      }
    )
})

module.exports = router;