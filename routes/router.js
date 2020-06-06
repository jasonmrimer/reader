const express = require('express');
const router = express.Router();

const passage = require('../models/passage.js');
const quiz = require('../models/quiz.js');
const submission = require('../models/submission.js');

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
        quizId: request.body.quizId,
        answers: request.body.answers
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

module.exports = router;