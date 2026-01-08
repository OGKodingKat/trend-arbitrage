export async function fetchTrends(){
  const res = await fetch('/api/trends');
  if (!res.ok) throw new Error('fetch failed');
  return res.json();
}
