import { getChampionsData } from "./data/riotApi.js";
async function initGame() {
  const champions = await getChampionsData();
  try {
    const champions = await getChampionsData();
    if (!champions || Object.keys(champions).length === 0) {
      throw new Error("Aucun champion trouvé !");
    }
  } catch (error) {
    console.error(error.message);
  }
  console.log("Champions Data :", champions);
}

document.addEventListener("DOMContentLoaded", () => {
  initGame();
});
