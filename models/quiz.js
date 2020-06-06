const mongoose = require('mongoose');

const quiz = mongoose.Schema({
  passage: {
    type: String,
    required: true
  },
  questions: {
    type: [],
    required: true
  },
});

module.exports = mongoose.model('quiz', quiz);
