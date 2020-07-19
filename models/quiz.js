const mongoose = require('mongoose');

const quiz = mongoose.Schema({
  passage: {
    type: Number,
    required: true
  },
  questions: {
    type: [],
    required: true
  },
});

module.exports = mongoose.model('quiz', quiz);
