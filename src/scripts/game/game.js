import { startGame } from "./startGame.js";
import { gameState } from "./gameState.js";
import { compareChampions } from "./compareChampions.js";
import { getRandomChampion } from "../utils/randomChampion.js";

let champions = {};

async function loadChampions() {
  try {
    const res = await fetch("scripts/data/gameData.json");
    if (!res.ok) throw new Error("Impossible de charger le JSON");
    champions = await res.json();
    console.log("Champions loaded:", champions);
  } catch (err) {
    console.error(err);
  }
}

function buildGameUI() {
  const inputDiv = document.createElement("div");
  const input = document.createElement("input");
  input.id = "championInput";
  input.placeholder = "Type Any champion to begin with ...";
  input.autocomplete = "off";
  inputDiv.appendChild(input);

  const dataList = document.createElement("datalist");
  dataList.id = "championList";
  input.setAttribute("list", "championList");
  inputDiv.appendChild(dataList);

  input.addEventListener("input", () => {
    if (input.value.length > 0) {
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    }
    const value = input.value;
    dataList.innerHTML = "";
    if (!value) return;

    const searchValue =
      value.charAt(0).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase();

    Object.keys(champions)
      .filter((champ) => champ.startsWith(searchValue))
      .forEach((champ) => {
        const option = document.createElement("option");
        option.value = champ;
        dataList.appendChild(option);
      });
  });

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", handleInput);
  inputDiv.appendChild(submitButton);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const firstOption = dataList.querySelector("option");
      if (firstOption) {
        input.value = firstOption.value;
      }

      submitButton.click();
    }
  });

  const filtersDiv = document.createElement("div");
  filtersDiv.id = "filters";

  const scoreDiv = document.createElement("div");
  scoreDiv.id = "score";
  scoreDiv.textContent = `You've guessed: ${gameState.score} Champions!`;

  document.body.append(inputDiv, filtersDiv, scoreDiv);
}

function handleInput() {
  const inputName = document.getElementById("championInput").value;
  const inputChampion = champions[inputName];

  if (!inputChampion) {
    alert("This champion does not exist");
    return;
  }

  const result = compareChampions(inputChampion, gameState.secretChampion);
  gameState.currentGuesses.push({ champion: inputChampion, result });
  updateFiltersUI(gameState.currentGuesses);

  if (inputChampion.name === gameState.secretChampion.name) {
    gameState.score += 1;
    gameState.secretChampion = getRandomChampion(champions);
    document.getElementById("championInput").value = "";
    console.log("Next secret champion:", gameState.secretChampion.name);
    document.getElementById("score").textContent =
      `You've guessed: ${gameState.score} Champions!`;
  }
}

function updateFiltersUI(history) {
  const filtersDiv = document.getElementById("filters");
  filtersDiv.innerHTML = "";

  const friendlyNames = {
    gender: "Gender",
    species: "Species",
    region: "Region",
    lane: "Lane",
    resource: "Resource",
    rangeType: "Range Type",
    esportPresence: "Esport Presence",
    tags: "Tags",
  };

  history.forEach((entry) => {
    const attemptDiv = document.createElement("div");
    attemptDiv.style.marginBottom = "12px";
    attemptDiv.style.display = "flex";
    attemptDiv.style.alignItems = "center";
    attemptDiv.style.gap = "8px";

    const img = document.createElement("img");
    img.src = entry.champion.image;
    img.alt = entry.champion.name;
    img.style.width = "60px";
    img.style.height = "60px";
    img.style.borderRadius = "8px";
    attemptDiv.appendChild(img);

    const badgesDiv = document.createElement("div");
    badgesDiv.style.display = "flex";
    badgesDiv.style.flexWrap = "wrap";
    badgesDiv.style.gap = "4px";

    for (const key in entry.result) {
      const color = entry.result[key];
      const value = Array.isArray(entry.champion[key])
        ? entry.champion[key].join(", ")
        : entry.champion[key];

      const span = document.createElement("span");
      span.textContent = `${friendlyNames[key] || key}: ${value}`;
      span.style.backgroundColor = color;
      span.style.color = "white";
      span.style.padding = "4px 8px";
      span.style.borderRadius = "5px";
      span.style.display = "inline-block";

      badgesDiv.appendChild(span);
    }

    attemptDiv.appendChild(badgesDiv);
    filtersDiv.appendChild(attemptDiv);
  });
}

function startTimer() {
  const timerDiv = document.createElement("div");
  timerDiv.id = "timer";
  document.body.appendChild(timerDiv);

  const timerInterval = setInterval(() => {
    if (!gameState.isRunning) {
      clearInterval(timerInterval);
      return;
    }

    gameState.timeLeft -= 1;
    timerDiv.textContent = `Time left: ${gameState.timeLeft}s`;

    if (gameState.timeLeft <= 0) {
      clearInterval(timerInterval);
      gameState.isRunning = false;
      alert(`Time's up! Your score: ${gameState.score}`);
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadChampions();

  document.getElementById("startButton").addEventListener("click", () => {
    startGame(champions);
    buildGameUI();
    startTimer();
    console.log("Secret champion:", gameState.secretChampion.name);
  });
});
