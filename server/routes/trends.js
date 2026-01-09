 import express from "express";
import Trend from "../models/Trend.js";
import { fetchReddit } from "../services/sources/reddit.js";
import { fetchHackerNews } from "../services/sources/hackernews.js";
import { fetchGitHub } from "../services/sources/github.js";
import { calculateRisingScore } from "../services/scoring.js";

const router = express.Router();

router.get("/refresh", async (req, res) => {
  try {
    const items = [
      ...(await fetchReddit()),
      ...(await fetchHackerNews()),
      ...(await fetchGitHub()),
    ];

    const grouped = {};

    items.forEach(item => {
      if (!item || !item.keyword) return; // ✅ guard

      if (!grouped[item.keyword]) {
        grouped[item.keyword] = {
          keyword: item.keyword,
          engagement: 0,
          sources: [],
          createdAt: item.createdAt || new Date(),
        };
      }

      grouped[item.keyword].engagement += item.engagement || 0;
      grouped[item.keyword].sources.push(item.source);
    });

    await Trend.deleteMany({});

    for (const trend of Object.values(grouped)) {
      const score = calculateRisingScore(trend);

      await Trend.create({
        ...trend,
        score,
      });
    }

    res.status(200).json({ status: "refreshed" }); // ✅ always respond

  } catch (err) {
    console.error("🔥 /refresh error:", err);
    res.status(500).json({
      error: "Failed to refresh trends",
      message: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  const trends = await Trend.find()
    .sort({ score: -1 })
    .limit(20);

  res.json(trends);
});

export default router;

