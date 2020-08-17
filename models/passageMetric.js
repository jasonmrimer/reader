const mongoose = require('mongoose');

const passageMetric = mongoose.Schema({
  user: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  interfaceName: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('passageMetric', passageMetric);
