const axios = require('axios');

const HN_BASE = 'https://hacker-news.firebaseio.com/v0';

async function fetchNew(limit=50){
  try{
    const idsRes = await axios.get(`${HN_BASE}/newstories.json`);
    const ids = (idsRes.data||[]).slice(0, limit);
    const items = await Promise.all(ids.map(async id=>{
      try{
        const r = await axios.get(`${HN_BASE}/item/${id}.json`);
        const d = r.data;
        if (!d) return null;
        return {title: d.title, url: d.url || `https://news.ycombinator.com/item?id=${id}`, source:'hackernews', meta:{score: d.score||0, descendants: d.descendants||0}, time: d.time ? new Date(d.time*1000) : new Date() };
      }catch(e){ return null }
    }));
    return items.filter(Boolean);
  }catch(err){
    console.warn('HN fetch failed', err.message);
    return [];
  }
}

module.exports = { fetchNew };
