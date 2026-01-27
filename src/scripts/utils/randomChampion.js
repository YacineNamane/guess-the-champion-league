export function getRandomChampion(champions) {
  const names = Object.keys(champions);
  const randomIndex = Math.floor(Math.random() * names.length);
  return champions[names[randomIndex]];
}
