const mongoose = require('mongoose');

const passage = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('passage', passage);
