const express = require('express');
const router = express.Router();

const passage = require('../models/passage.js');
const quiz = require('../models/quiz.js');

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

module.exports = router;