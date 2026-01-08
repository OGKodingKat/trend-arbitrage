import React, {useEffect, useState} from 'react';
import TrendList from './components/TrendList';
import {fetchTrends} from './services/api';

export default function App(){
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async ()=>{
    setLoading(true);
    try{
      const r = await fetchTrends();
      setTrends(r);
    }catch(e){ console.error(e) }
    setLoading(false);
  }

  useEffect(()=>{ load(); },[]);

  return (
    <div style={{padding:20,fontFamily:'sans-serif'}}>
      <h2>Trend Arbitrage — Emerging Trends</h2>
      <button onClick={load} disabled={loading}>{loading? 'Loading...':'Refresh'}</button>
      <TrendList items={trends} />
    </div>
  )
}
