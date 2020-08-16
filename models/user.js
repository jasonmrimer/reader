const mongoose = require('mongoose');

const user = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user', user);
