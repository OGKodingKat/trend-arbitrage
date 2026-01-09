# Trend Arbitrage

## Overview
Trend Arbitrage is a MERN stack web application that detects emerging trends **before** they hit the mainstream. It pulls data from multiple sources, applies a custom scoring algorithm, and displays trends in a simple interface.

---

## Setup

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (local or Docker)
- **Docker** (optional, for MongoDB setup)

### Environment Variables
Create a `.env` file in the `server/` directory with the following:
```
MONGO_URI=mongodb://localhost:27017/trend-arbitrage
PORT=5000
GITHUB_TOKEN=<your_github_api_token>
```

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your_username>/trend-arbitrage.git
   cd trend-arbitrage
   ```

2. Install dependencies:
   ```bash
   # Server
   cd server
   npm install

   # Client
   cd ../client
   npm install
   ```

### Running the Application
1. Start MongoDB:
   - **Using Docker**:
     ```bash
     docker run -d -p 27017:27017 --name mongodb mongo:latest
     ```
   - **Using Local MongoDB**:
     Ensure MongoDB is installed and running locally.

2. Start the server:
   ```bash
   cd server
   npm start
   ```

3. Start the client:
   ```bash
   cd client
   npm start
   ```

---

## Assumptions
1. **MongoDB**:
   - MongoDB is running locally or via Docker.
   - The `MONGO_URI` in `.env` points to a valid MongoDB instance.
2. **GitHub API**:
   - A valid GitHub API token is provided in `.env`.
   - The token has sufficient permissions to access the GitHub API.
3. **Data Sources**:
   - APIs for GitHub, Hacker News, and Reddit are accessible and functional.
4. **Environment**:
   - The application is being run on a development machine with Node.js installed.

---

## Explanations

### Project Structure
```
trend-arbitrage/
├── README.md                # Project documentation
├── .env.example             # Environment variables template
│
├── server/                  # Backend (Node.js + Express)
│   ├── index.js             # Express entry point
│   ├── routes/              # API routes
│   │   └── trends.js        # Routes for trends API
│   ├── services/            # Data sources and scoring logic
│   │   ├── sources/         # One file per data source
│   │   │   ├── github.js    # GitHub data source
│   │   │   ├── hackernews.js # Hacker News data source
│   │   │   └── reddit.js    # Reddit data source
│   │   └── scoring.js       # Trend scoring algorithm
│   ├── models/              # MongoDB schemas
│   │   └── Trend.js         # Trend schema
│   └── utils/               # Helpers (if needed)
│
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── components/      # React components
│   │   │   └── TrendList.jsx # Displays trends
│   │   └── services/        # API calls
│   │       └── api.js       # Fetch trends from server
│   └── package.json         # Client dependencies
│
└── package.json             # Root package.json (scripts for server/client)
```

### Trend Detection Logic
The "rising score" algorithm combines **engagement** and **recency**:
1. **Engagement**: Higher engagement (e.g., stars, likes) increases the score.
2. **Recency**: More recent trends are weighted higher.
3. **Formula**:
   ```
   score = engagement / sqrt(hoursSinceCreation + 1)
   ```

### Data Sources
1. **GitHub**: Fetches repositories created recently with high stars.
2. **Hacker News**: Fetches new stories with high velocity.
3. **Reddit**: Scrapes posts from niche subreddits.

---

Let me know if you need further adjustments or additional sections!# Trend Arbitrage

## Overview
Trend Arbitrage is a MERN stack web application that detects emerging trends **before** they hit the mainstream. It pulls data from multiple sources, applies a custom scoring algorithm, and displays trends in a simple interface.

---

## Setup

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (local or Docker)
- **Docker** (optional, for MongoDB setup)

### Environment Variables
Create a `.env` file in the `server/` directory with the following:
```
MONGO_URI=mongodb://localhost:27017/trend-arbitrage
PORT=5000
GITHUB_TOKEN=<your_github_api_token>
```

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your_username>/trend-arbitrage.git
   cd trend-arbitrage
   ```

2. Install dependencies:
   ```bash
   # Server
   cd server
   npm install

   # Client
   cd ../client
   npm install
   ```

### Running the Application
1. Start MongoDB:
   - **Using Docker**:
     ```bash
     docker run -d -p 27017:27017 --name mongodb mongo:latest
     ```
   - **Using Local MongoDB**:
     Ensure MongoDB is installed and running locally.

2. Start the server:
   ```bash
   cd server
   npm start
   ```

3. Start the client:
   ```bash
   cd client
   npm start
   ```

---

## Assumptions
1. **MongoDB**:
   - MongoDB is running locally or via Docker.
   - The `MONGO_URI` in `.env` points to a valid MongoDB instance.
2. **GitHub API**:
   - A valid GitHub API token is provided in `.env`.
   - The token has sufficient permissions to access the GitHub API.
3. **Data Sources**:
   - APIs for GitHub, Hacker News, and Reddit are accessible and functional.
4. **Environment**:
   - The application is being run on a development machine with Node.js installed.

---

## Explanations

### Project Structure
```
trend-arbitrage/
├── README.md                # Project documentation
├── .env.example             # Environment variables template
│
├── server/                  # Backend (Node.js + Express)
│   ├── index.js             # Express entry point
│   ├── routes/              # API routes
│   │   └── trends.js        # Routes for trends API
│   ├── services/            # Data sources and scoring logic
│   │   ├── sources/         # One file per data source
│   │   │   ├── github.js    # GitHub data source
│   │   │   ├── hackernews.js # Hacker News data source
│   │   │   └── reddit.js    # Reddit data source
│   │   └── scoring.js       # Trend scoring algorithm
│   ├── models/              # MongoDB schemas
│   │   └── Trend.js         # Trend schema
│   └── utils/               # Helpers (if needed)
│
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── components/      # React components
│   │   │   └── TrendList.jsx # Displays trends
│   │   └── services/        # API calls
│   │       └── api.js       # Fetch trends from server
│   └── package.json         # Client dependencies
│
└── package.json             # Root package.json (scripts for server/client)
```

### Trend Detection Logic
The "rising score" algorithm combines **engagement** and **recency**:
Engagement Matters – You look at how popular a trend is (likes, shares, comments, etc.) using the engagement value. More engagement means a higher score.

Recency Counts – Trends lose heat over time. You measure how many hours have passed since the trend was created (hoursSinceCreation) and reduce the score accordingly.

Score Calculation – You divide engagement by the square root of (hoursSinceCreation + 1). The square root slows the decay so very recent trends are boosted more, but older trends with lots of engagement still get some weight.

### Data Sources
1. **GitHub**: Fetches repositories created recently with high stars.
2. **Hacker News**: Fetches new stories with high velocity.
3. **Reddit**: Scrapes posts from niche subreddits.
