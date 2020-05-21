const mongoose = require('mongoose');

const passage = mongoose.Schema({
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
