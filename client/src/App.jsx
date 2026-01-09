import React, { useEffect, useState } from "react";

export default function App() {
  const [trends, setTrends] = useState([]);

  const load = async () => {
    await fetch("http://localhost:5001/api/trends/refresh");
    const res = await fetch("http://localhost:5001/api/trends");
    setTrends(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🔮 Emerging Trends</h1>
      <button onClick={load}>Refresh</button>

      {trends.map(t => (
        <div key={t._id}>
          <h3>{t.keyword}</h3>
          <p>Score: {t.score.toFixed(2)}</p>
          <p>Sources: {t.sources.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
