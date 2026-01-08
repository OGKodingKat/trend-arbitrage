const natural = require('natural');

function hoursSince(date){
  return (Date.now() - new Date(date).getTime()) / (1000*60*60);
}

function normalizeTitle(t){
  return t.replace(/\s+/g,' ').trim().toLowerCase();
}

function scoreCandidates(items){
  // Aggregate by normalized title (simple dedupe)
  const map = new Map();
  const sourceWeights = {reddit:1.2, hackernews:1.5, rss:1.0};

  for (let it of items){
    const n = normalizeTitle(it.title || '');
    if (!n) continue;
    const ageH = hoursSince(it.time || it.createdAt || Date.now());
    const recency = Math.exp(-ageH/24); // decays over ~1 day
    const sweight = sourceWeights[it.source] || 1.0;
    const metric = (it.meta && (it.meta.score || it.meta.descendants || it.meta.comments || 0)) || 0;
    const contribution = sweight * recency * Math.log(1 + Math.abs(metric));

    if (!map.has(n)) map.set(n, {title: it.title, url: it.url, source: it.source, score:0, hits:0, examples: []});
    const bucket = map.get(n);
    bucket.score += contribution;
    bucket.hits += 1;
    bucket.examples.push(it);
  }

  // Final scoring: boost by hits and small fuzz factor for short titles
  const results = Array.from(map.values()).map(b => {
    const lenPenalty = Math.max(0, 1 - (b.title.length / 200));
    const final = b.score * (1 + Math.log(1 + b.hits)) * (1 + lenPenalty*0.2);
    return {...b, score: final};
  }).sort((a,b)=>b.score - a.score);

  return results;
}

module.exports = { scoreCandidates };
