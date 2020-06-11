const mongoose = require('mongoose');

const metric = mongoose.Schema({
  interfaceName: {
    type: String,
    required: true
  },
  completionCount: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('metric', metric);
