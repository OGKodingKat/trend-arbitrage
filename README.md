# Trend Arbitrage

Prototype MERN app that detects emerging trends from multiple sources.

See `./server` and `./client` for code. Setup and algorithm description are in this README.

Quick start (development):

1. Copy env template: `cp .env.example .env` and fill `MONGO_URI`.
2. Install server deps: `cd server && npm install`
3. Start server: `npm start` (from `server`)
4. Install client deps: `cd client && npm install`
5. Start client dev server (optional; client is minimal React).

Core pieces:
- server/services/sources: data adapters (Reddit scraping, Hacker News API, RSS)
- server/services/scoring.js: rising score algorithm
- client: simple React app that hits `/api/trends`

---

Algorithm (brief):

We compute a "rising score" by combining recency-weighted signals across sources. Each source reports candidate items; for each item we compute a per-source contribution:

- contribution = source_weight * exp(-age_hours / 24) * log(1 + metric)

Where `metric` is a source-specific measure (score, comments, stars). We aggregate contributions for items that look similar (title similarity) and rank by total score. Newer, quickly-growing items score higher.

Assumptions & tradeoffs
- Prototype: no persistent historical baselines are used (would improve novelty detection).
- One source uses HTML scraping (Reddit old UI) to avoid requiring API keys.

Data sources used
- Hacker News (official Firebase API)
- Reddit (HTML scrape of `old.reddit.com` new posts)
- RSS feeds (The Verge, arXiv)

See `server/services/scoring.js` for more details.
