/*test JS / html Link */
function initGame() {
  console.log("Game started");
}

const div = document.createElement("div");
div.classList.add("game-container");
const h2 = document.createElement("h2");
h2.classList.add("game-title");
h2.textContent = "Game Started JS";
div.appendChild(h2);
document.body.appendChild(div);

document.addEventListener("DOMContentLoaded", () => {
  initGame();
});
