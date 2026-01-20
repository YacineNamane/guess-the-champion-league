export async function getChampionsData() {
  const url =
    "https://ddragon.leagueoflegends.com/cdn/16.1.1/data/en_US/champion.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status:
            ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
