const mongoose = require('mongoose');

const TrendSchema = new mongoose.Schema({
  title: {type: String, required: true, index: true},
  source: String,
  score: Number,
  url: String,
  meta: Object,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Trend', TrendSchema);
