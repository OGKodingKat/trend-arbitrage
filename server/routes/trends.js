const express = require('express');
const router = express.Router();
const reddit = require('../services/sources/reddit');
const hackernews = require('../services/sources/hackernews');
const rssFeeds = require('../services/sources/rss');
const scoring = require('../services/scoring');
const Trend = require('../models/Trend');

router.get('/', async (req, res) => {
  try {
    // fetch candidates in parallel
    const [rItems, hnItems, rssItems] = await Promise.all([
      reddit.fetchNew(),
      hackernews.fetchNew(),
      rssFeeds.fetchFeeds()
    ]);

    const all = [...rItems, ...hnItems, ...rssItems];
    const scored = scoring.scoreCandidates(all);

    // save top results to DB (upsert by title)
    const results = [];
    for (let t of scored.slice(0, 50)){
      const doc = await Trend.findOneAndUpdate({title: t.title}, {...t, updatedAt: new Date()}, {upsert:true, new:true});
      results.push(doc);
    }

    res.json(results.sort((a,b)=>b.score - a.score));
  } catch (err){
    console.error(err);
    res.status(500).json({error: 'failed to fetch trends'});
  }
});

module.exports = router;
