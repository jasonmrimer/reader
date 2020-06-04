const mongoose = require('mongoose');

const quiz = mongoose.Schema({
  questions: {
    type: [],
    required: true
  },
});

module.exports = mongoose.model('quiz', quiz);
