import fetch from "node-fetch";

export async function fetchGitHub() {
  try {
    const res = await fetch(
      "https://api.github.com/search/repositories?q=created:>2024-12-30&sort=stars",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const json = await res.json();

    // ❗ If GitHub returns an error, do NOT crash the app
    if (!res.ok || !Array.isArray(json.items)) {
      console.error("GitHub API problem:", json);
      return [];
    }

    return json.items.slice(0, 20).map(r => ({
      keyword: r.name,
      engagement: r.stargazers_count,
      createdAt: new Date(r.created_at),
      source: "github",
    }));
  } catch (err) {
    console.error("fetchGitHub failed:", err);
    return [];
  }
}
