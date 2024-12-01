import {LocalStorage} from 'node-localstorage';

// Initialize localStorage in a specific directory
global.localStorage = new LocalStorage('./scratch');

const sessionId = '53616c7465645f5fee80e2be18e81cec04ebb97d92bfdd54d8d807ccf3b36989730063b220c572fd4beb8e260db9223ec34142bdb8d20640a0b4d5d0130b5151';

export async function fetchAoc(year: number, day: number): Promise<string[]> {
  const key = `${year}-${day}`;
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  const serverResult = await fetchFromApi(year, day);
  const array = serverResult.split('\n');
  localStorage.setItem(key, JSON.stringify(array));

  return array || [];
}

async function fetchFromApi(year: number, day: number) {
  const result = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      Cookie: `session=${sessionId}`,
    },
  });
  return result.text();
}
