import { gameState } from "./gameState.js";
import { getRandomChampion } from "../utils/randomChampion.js";
export function startGame(champions) {
  gameState.isRunning = true;
  gameState.score = 0;
  gameState.timeLeft = 600;
  gameState.secretChampion = getRandomChampion(champions);
}
