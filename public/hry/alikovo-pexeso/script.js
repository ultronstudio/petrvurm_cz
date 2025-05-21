let cards = [];
let flipped = [];
let matched = 0;
let attempts = 0;
let time = 0;
let interval;
let totalPairs = 0;

const board = document.getElementById("board");
const score = document.getElementById("score");
const timer = document.getElementById("timer");
const hud = document.getElementById("hud");
const menu = document.getElementById("menu");
const difficultySelect = document.getElementById("difficultySelect");

const startBtn = document.getElementById("startBtn");
const infoBtn = document.getElementById("infoBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const winModal = document.getElementById("winModal");
const winStats = document.getElementById("winStats");
const restartBtn = document.getElementById("restartBtn");
const toMainMenuBtn = document.getElementById("toMainMenuBtn");

startBtn.addEventListener("click", startNewGame);
infoBtn.addEventListener("click", () => modal.style.display = "block");
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
restartBtn.addEventListener("click", () => {
  winModal.style.display = "none";
  startNewGame();
});
toMainMenuBtn.addEventListener("click", () => {
  winModal.style.display = "none";
  menu.style.display = "block";
  hud.style.display = "none";
  board.innerHTML = "";
  clearInterval(interval);
  cards = [];
  flipped = [];
  matched = 0;
  attempts = 0;
  time = 0;
  score.textContent = "Pokusy: 0";
  timer.textContent = "Čas: 0 s";
  difficultySelect.selectedIndex = 0;
  totalPairs = 0;
});

function generateCards() {
  const newCards = [];
  for (let i = 0; i < totalPairs; i++) {
    const path = "img/front_" + i + ".png";
    newCards.push(path, path);
  }
  return newCards.sort(() => 0.5 - Math.random());
}

function startNewGame() {
  const selectedValue = parseInt(difficultySelect.value);

  if (isNaN(selectedValue)) {
  alert("Nejprve vyber obtížnost!");
  return;
}
totalPairs = selectedValue;

  clearInterval(interval);
  cards = generateCards();
  flipped = [];
  matched = 0;
  attempts = 0;
  time = 0;
  score.textContent = "Pokusy: 0";
  timer.textContent = "Čas: 0 s";
  hud.style.display = "block";
  menu.style.display = "none";
  board.innerHTML = "";
  buildBoard();
  startTimer();
}

function startTimer() {
  interval = setInterval(() => {
    time++;
    timer.textContent = "Čas: " + time + " s";
  }, 1000);
}

function createCard(image, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("inner");
  inner.dataset.index = index;

  const front = document.createElement("div");
  front.classList.add("front");
  front.style.backgroundImage = `url('${image}')`;

  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = "url('img/back.png')";

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);
  card.addEventListener("click", () => flipCard(card, index));
  return card;
}

function buildBoard() {
  cards.forEach((img, i) => {
    const card = createCard(img, i);
    board.appendChild(card);
  });
}

function flipCard(card, index) {
  const inner = card.querySelector(".inner");
  if (card.classList.contains("flipped") || flipped.length === 2) return;
  card.classList.add("flipped");
  flipped.push({ element: card, image: cards[index] });

  if (flipped.length === 2) {
    attempts++;
    score.textContent = "Pokusy: " + attempts;
    const [a, b] = flipped;
    if (a.image === b.image) {
      a.element.classList.add("matched");
      b.element.classList.add("matched");
      matched += 2;
      flipped = [];
      if (matched === cards.length) {
        clearInterval(interval);
        showWinModal();
      }
    } else {
      setTimeout(() => {
        a.element.classList.remove("flipped");
        b.element.classList.remove("flipped");
        flipped = [];
      }, 1000);
    }
  }
}

function showWinModal() {
  winStats.textContent = `Dokončeno za ${time} sekund a ${attempts} pokusů.`;
  winModal.style.display = "block";
}
