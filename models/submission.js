const mongoose = require('mongoose');

const submission = mongoose.Schema({
  user: {
    type: Object,
    require: true
  },
  date: {
    type: Date,
    require: true
  },
  quizId: {
    type: String,
    required: true
  },
  answers: {
    type: [],
    required: true
  },
  interface: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('submission', submission);
