import fetch from "node-fetch";

export async function fetchGitHub() {
  const res = await fetch(
    "https://api.github.com/search/repositories?q=created:>2024-12-30&sort=stars",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const json = await res.json();

  return json.items.slice(0, 20).map(r => ({
    keyword: r.name,
    engagement: r.stargazers_count,
    createdAt: new Date(r.created_at),
    source: "github",
  }));
}
