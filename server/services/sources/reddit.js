import fetch from "node-fetch";

export async function fetchReddit() {
  const res = await fetch(
    "https://www.reddit.com/r/LocalLLaMA/new.json?limit=25",
    { headers: { "User-Agent": "trend-arb" } }
  );

  const json = await res.json();

  return json.data.children.map(p => ({
    keyword: p.data.title,
    engagement: p.data.ups + p.data.num_comments,
    createdAt: new Date(p.data.created_utc * 1000),
    source: "reddit",
  }));
}
