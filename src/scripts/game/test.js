import { compareChampions } from "../game/compareChampions.js";
import champions from "../data/gameData.json" assert { type: "json" };

const secret = champions["Irelia"];
const input = champions["Riven"];

console.log(compareChampions(input, secret));
