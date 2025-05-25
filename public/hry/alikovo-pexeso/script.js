let cards = [];
let flipped = [];
let matched = 0;
let attempts = 0;
let time = 0;
let interval;
let totalPairs = 0;
const maxPairs = 34; // Počet párů karet v systému (indexováno od nuly) - každý tato karta může tvořit pár s další stejnou kartou. celkem je to 34 párů (68 karet)

const board = document.getElementById("board");
const score = document.getElementById("score");
const timer = document.getElementById("timer");
const hud = document.getElementById("hud");
const menu = document.getElementById("menu");
const difficultySelect = document.getElementById("difficultySelect");
const bgMusic = document.getElementById("backgroundMusic");

const startBtn = document.getElementById("startBtn");
const infoBtn = document.getElementById("infoBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const winModal = document.getElementById("winModal");
const winStats = document.getElementById("winStats");
const restartBtn = document.getElementById("restartBtn");
const toMainMenuBtn = document.getElementById("toMainMenuBtn");
const toggleMusicBtn = document.getElementById("toggleMusicBtn");
const toggleSoundsBtn = document.getElementById("toggleSoundsBtn");

let musicStarted = false;
let musicEnabled = true;
let soundEnabled = true;

document.addEventListener("DOMContentLoaded", () => {
  const storedMusicEnabled = localStorage.getItem("musicEnabled");
  const storedSoundEnabled = localStorage.getItem("soundEnabled");
  
  if(storedMusicEnabled == null) {
    musicEnabled = storedMusicEnabled === "true";
    localStorage.setItem("musicEnabled", musicEnabled);
  }

  if(storedSoundEnabled == null) {
    soundEnabled = storedSoundEnabled === "true";
    localStorage.setItem("soundEnabled", soundEnabled);
  }

  musicEnabled = storedMusicEnabled == "true";
  soundEnabled = storedSoundEnabled == "true";

  toggleMusicBtn.checked = musicEnabled;
  toggleSoundsBtn.checked = soundEnabled;

  bgMusic.muted = !musicEnabled;

  updateToggleText("toggleMusicBtn", musicEnabled);
  updateToggleText("toggleSoundsBtn", soundEnabled);
});

toggleMusicBtn.addEventListener("change", () => {
  musicEnabled = toggleMusicBtn.checked;
  localStorage.setItem("musicEnabled", musicEnabled);

  if (musicEnabled) {
    bgMusic.muted = false;
    ensureMusicPlaying();
  } else {
    bgMusic.muted = true;
    stopBackgroundMusic();
  }

  updateToggleText("toggleMusicBtn", musicEnabled);
});

toggleSoundsBtn.addEventListener("change", () => {
  soundEnabled = toggleSoundsBtn.checked;
  localStorage.setItem("soundEnabled", soundEnabled);

  updateToggleText("toggleSoundsBtn", soundEnabled);
});

function updateToggleText(id, isEnabled) {
  const label = document.querySelector(`label[for="${id}"]`) || document.getElementById(id)?.closest("label");
  if (!label) return;

  const span = label.querySelector("span[data-flip]");
  if (span) {
    span.innerHTML = isEnabled ? "<span>Zapnuto</span>" : span.dataset.flip;
  }

  if(soundEnabled) {
    playSound("switchToggle");
  }
}

function ensureMusicPlaying() {
  if (!musicStarted) {
    bgMusic.volume = 0.5;
    bgMusic.loop = true;
    bgMusic.muted = false;
    bgMusic.play().catch((e) => console.warn("Hudba zablokována:", e));
    musicStarted = true;
  }
}

document.addEventListener("click", () => {
  if (localStorage.getItem("musicEnabled") == "false") {
    bgMusic.muted = true;
    toggleMusicBtn.textContent = "Hudba: Vypnuto";
  } else if (localStorage.getItem("musicEnabled") == "true") {
    bgMusic.muted = false;
    toggleMusicBtn.textContent = "Hudba: Zapnuto";
    ensureMusicPlaying();
  } else {
    console.error("Nastavení hudby není platné.");
  }
}, { once: true }); // spustí se jen jednou

startBtn.addEventListener("click", () => {
  startNewGame();
});

infoBtn.addEventListener("click", () => {
  if (!musicStarted && musicEnabled) {
    ensureMusicPlaying();
  }

  modal.style.display = "block";
});

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

  if (!musicStarted && musicEnabled) {
    ensureMusicPlaying();
  }
});

function generateCards() {
  const allIndices = Array.from({ length: maxPairs }, (_, i) => i);
  const selectedIndices = shuffleArray(allIndices).slice(0, totalPairs);

  const newCards = [];
  selectedIndices.forEach(i => {
    const path = "img/front_" + i + ".png";
    newCards.push(path, path);
  });

  return shuffleArray(newCards); // Náhodně rozmístí dvojice
}

function startNewGame() {
  const selectedValue = parseInt(difficultySelect.value);

  if (isNaN(selectedValue)) {
    alert("Nejprve vyber obtížnost!");
    return;
  }

  if (selectedValue > maxPairs) {
    alert("Jejda! Hra umožňuje maximálně " + maxPairs + " párů karet, ale ty jsi vybral " + selectedValue + "!");
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
  buildBoard();
  startTimer();
  hideDifficultySelect();

  if (!musicStarted && musicEnabled) {
    ensureMusicPlaying();
  }
}

function hideDifficultySelect() {
  difficultySelect.style.display = "none";
}

function showDifficultySelect() {
  difficultySelect.style.display = "block";
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
  board.innerHTML = "";

  // Nastav počet sloupců podle počtu párů (karet / 2)
  let columns = 4;
  if (totalPairs > 8) columns = 8;
  if (totalPairs > 16) columns = 10;
  if (totalPairs > 25) columns = 14;

  board.style.gridTemplateColumns = `repeat(${columns}, 100px)`;

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

  if (soundEnabled) {
    playSound("flipSound");
  }

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

        if (soundEnabled) {
          playSound("flipSound");
        }
      }, 1000);
    }
  }
}

function showWinModal() {
  if(soundEnabled) {
    playSound("winSound");
  }

  if(musicEnabled) {
    stopBackgroundMusic();
  }

  winStats.textContent = `Dokončeno za ${time} sekund a ${attempts} pokusů.`;
  winModal.style.display = "block";

  showDifficultySelect();
}

function playSound(id) {
  if (!soundEnabled) return;
  const sound = document.getElementById(id);
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function playBackgroundMusic() {
  ensureMusicPlaying();
}

function stopBackgroundMusic() {
  bgMusic.pause();
  bgMusic.currentTime = 0;
  musicStarted = false;
  bgMusic.muted = true;
  bgMusic.volume = 0;
  bgMusic.loop = false;
}

function shuffleArray(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}