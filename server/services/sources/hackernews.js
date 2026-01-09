import fetch from "node-fetch";

export async function fetchHackerNews() {
  const ids = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  ).then(r => r.json());

  const stories = await Promise.all(
    ids.slice(0, 20).map(id =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(r => r.json())
    )
  );

  return stories.map(s => ({
    keyword: s.title,
    engagement: s.score || 0,
    createdAt: new Date(s.time * 1000),
    source: "hackernews",
  }));
}
