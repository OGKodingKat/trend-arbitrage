const Parser = require('rss-parser');
const parser = new Parser();

const FEEDS = [
  'https://www.theverge.com/rss/index.xml',
  'http://export.arxiv.org/rss/cs.LG'
];

async function fetchFeeds(){
  const items = [];
  for (let f of FEEDS){
    try{
      const feed = await parser.parseURL(f);
      feed.items.slice(0,20).forEach(it=>{
        items.push({title: it.title, url: it.link, source: 'rss', meta:{feed: feed.title}, time: it.isoDate ? new Date(it.isoDate) : new Date()});
      });
    }catch(err){
      console.warn('rss fetch failed', f, err.message);
    }
  }
  return items;
}

module.exports = { fetchFeeds };
