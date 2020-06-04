const mongoose = require('mongoose');

const submission = mongoose.Schema({
  quizId: {
    type: String,
    required: true
  },
  answers: {
    type: [],
    required: true
  }
});

module.exports = mongoose.model('submission', submission);
