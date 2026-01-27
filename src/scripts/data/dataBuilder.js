import { getChampionsData } from "../data/riotApi.js";
import fs from "fs";

async function buildGameData() {
  const rawData = await getChampionsData();
  if (!rawData) {
    console.error("Pas de data reçue !");
    return;
  }

  const gameData = {};

  for (const champKey in rawData) {
    const champ = rawData[champKey];

    gameData[champKey] = {
      name: champ.name,
      gender: "unknown",
      region: "unknown",
      lane: champ.tags[0] || "unknown",
      tags: champ.tags || [],
      image: `http://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${champ.image.full}`,
    };
  }

  fs.writeFileSync(
    "src/scripts/data/gameData.json",
    JSON.stringify(gameData, null, 2),
  );
  console.log("JSON généré avec succès !");
}

buildGameData();
