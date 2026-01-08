import React from 'react';

export default function TrendList({items=[]}){
  if (!items.length) return <div style={{marginTop:20}}>No trends yet.</div>
  return (
    <ul style={{marginTop:20}}>
      {items.map((t, i)=> (
        <li key={i} style={{marginBottom:12}}>
          <a href={t.url} target="_blank" rel="noreferrer">{t.title}</a>
          <div style={{fontSize:12,color:'#666'}}>score: {t.score.toFixed(3)} • source: {t.source}</div>
        </li>
      ))}
    </ul>
  )
}
