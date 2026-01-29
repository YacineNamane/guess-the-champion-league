import { startGame } from "./startGame.js";
import { gameState } from "./gameState.js";
import { compareChampions } from "./compareChampions.js";
import { getRandomChampion } from "../utils/randomChampion.js";

let champions = {};
const app = document.getElementById("app");

async function loadChampions() {
  try {
    const res = await fetch("scripts/data/gameData.json");
    if (!res.ok) throw new Error("Impossible de charger le JSON");
    champions = await res.json();
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

  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", handleInput);
  inputDiv.appendChild(submitButton);

  const startButton = document.createElement("button");
  startButton.type = "button";
  startButton.textContent = "Start Game";
  startButton.addEventListener("click", () => {
    startGame(champions);
    startTimer();
    startButton.disabled = true;
    console.log("Secret champion:", gameState.secretChampion.name);
  });
  inputDiv.appendChild(startButton);

  input.addEventListener("input", () => {
    dataList.innerHTML = "";
    const value = input.value;
    if (!value) return;
    const searchValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    Object.keys(champions)
      .filter((champ) => champ.startsWith(searchValue))
      .forEach((champ) => {
        const option = document.createElement("option");
        option.value = champ;
        dataList.appendChild(option);
      });
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const firstOption = dataList.querySelector("option");
      if (firstOption) input.value = firstOption.value;
      submitButton.click();
    }
  });

  const filtersDiv = document.createElement("div");
  filtersDiv.id = "filters";

  const scoreDiv = document.createElement("div");
  scoreDiv.id = "score";
  scoreDiv.textContent = `You've guessed: ${gameState.score} Champions!`;

  app.append(inputDiv, filtersDiv, scoreDiv);
}

function handleInput() {
  const inputName = document.getElementById("championInput").value;
  const inputChampion = champions[inputName];
  if (!inputChampion) return alert("This champion does not exist");

  const result = compareChampions(inputChampion, gameState.secretChampion);
  gameState.currentGuesses.push({ champion: inputChampion, result });
  updateFiltersUI(gameState.currentGuesses);

  if (inputChampion.name === gameState.secretChampion.name) {
    gameState.score += 1;
    gameState.currentGuesses = [];
    updateFiltersUI(gameState.currentGuesses);
    gameState.secretChampion = getRandomChampion(champions);
    console.log("Secret champion:", gameState.secretChampion.name);
    document.getElementById("championInput").value = "";
    document.getElementById("score").textContent =
      `You've guessed: ${gameState.score} Champions!`;
  }
}

function updateFiltersUI(history) {
  const filtersDiv = document.getElementById("filters");
  filtersDiv.innerHTML = "";

  if (history.length === 0) return;

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

  const table = document.createElement("table");
  table.id = "filtersTable";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const thPortrait = document.createElement("th");
  thPortrait.textContent = "Portrait";
  headerRow.appendChild(thPortrait);

  for (const key in friendlyNames) {
    const th = document.createElement("th");
    th.textContent = friendlyNames[key];
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  history.forEach((entry) => {
    const row = document.createElement("tr");

    const tdPortrait = document.createElement("td");
    const img = document.createElement("img");
    img.src = entry.champion.image;
    img.alt = entry.champion.name;
    img.className = "portrait";
    tdPortrait.appendChild(img);

    row.appendChild(tdPortrait);

    for (const key in friendlyNames) {
      const td = document.createElement("td");
      td.className = entry.result[key];

      let value = entry.champion[key];
      if (Array.isArray(value)) {
        td.innerHTML = "";
        value.forEach((v) => {
          const tag = document.createElement("span");
          tag.className = "tag";
          tag.textContent = v;
          td.appendChild(tag);
        });
      } else {
        td.textContent = value;
      }

      row.appendChild(td);
    }

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  filtersDiv.appendChild(table);
}

function startTimer() {
  const timerDiv = document.createElement("div");
  timerDiv.id = "timer";
  app.appendChild(timerDiv);

  gameState.isRunning = true;

  const timerInterval = setInterval(() => {
    if (!gameState.isRunning) return clearInterval(timerInterval);
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
  buildGameUI();
});
