import mongoose from "mongoose";

const TrendSchema = new mongoose.Schema({
  keyword: String,
  engagement: Number,
  sources: [String],
  createdAt: Date,
  score: Number,
});

export default mongoose.model("Trend", TrendSchema);
