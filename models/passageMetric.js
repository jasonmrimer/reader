const mongoose = require('mongoose');

const passageMetric = mongoose.Schema({
  interfaceName: {
    type: String,
    required: true
  },
  completionCount: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('passageMetric', passageMetric);
