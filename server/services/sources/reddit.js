const axios = require('axios');
const cheerio = require('cheerio');

async function fetchNew(){
  // Scrape old.reddit.com for new posts in a few tech subreddits
  const subs = ['technology','programming','MachineLearning'];
  const items = [];
  for (let s of subs){
    try{
      const url = `https://old.reddit.com/r/${s}/new/`;
      const res = await axios.get(url, {headers:{'User-Agent':'trend-arb-bot/0.1'}});
      const $ = cheerio.load(res.data);
      $('.thing').each((i, el)=>{
        const title = $(el).find('a.title').text().trim();
        const link = $(el).find('a.title').attr('href');
        const time = $(el).find('time').attr('datetime');
        const score = parseInt($(el).attr('data-score')||0,10);
        if (title) items.push({title, url: link, source: 'reddit', meta:{subreddit: s, score}, time: time ? new Date(time) : new Date()});
      });
    }catch(err){
      console.warn('reddit fetch failed for', s, err.message);
    }
  }
  return items;
}

module.exports = { fetchNew };
