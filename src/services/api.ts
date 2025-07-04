const BASE_URL = 'https://3209glbex9.execute-api.eu-north-1.amazonaws.com';

export async function fetchSports() {
  const res = await fetch(`${BASE_URL}/sport/all`);
  if (!res.ok) throw new Error('Failed to fetch sports');
  return res.json();
}

export async function fetchTournaments() {
  const res = await fetch(`${BASE_URL}/tournament/all`);
  if (!res.ok) throw new Error('Failed to fetch tournaments');
  return res.json();
}

export async function fetchMatches() {
  const res = await fetch(`${BASE_URL}/match/all`);
  if (!res.ok) throw new Error('Failed to fetch matches');
  return res.json();
} 