const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const startScreen = document.getElementById('startScreen');
const winScreen = document.getElementById('winScreen');
const gameContainer = document.getElementById('gameContainer');
const memoryGame = document.getElementById('memoryGame');
const movesText = document.getElementById('moves');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;

const animals = [
  "https://upload.wikimedia.org/wikipedia/commons/5/5b/Woolly_mammoth.png", // mamut
  "https://upload.wikimedia.org/wikipedia/commons/f/f7/Dodo_1.jpg", // dodo
  "https://upload.wikimedia.org/wikipedia/commons/0/03/Tasmanian_Tiger.jpg", // tilacino
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Megalodon_BW.jpg", // megalodon
  "https://upload.wikimedia.org/wikipedia/commons/a/ad/Saber-toothed_tiger.png", // smilodon
  "https://upload.wikimedia.org/wikipedia/commons/8/84/Quagga_photo.jpg" // quagga
];

let cards = [];

function createBoard() {
  cards = [...animals, ...animals]
    .sort(() => 0.5 - Math.random())
    .map(src => {
      const card = document.createElement('div');
      card.classList.add('memory-card');
      card.innerHTML = `
        <div class="front-face" style="background-image: url('${src}')"></div>
        <div class="back-face"></div>
      `;
      card.addEventListener('click', flipCard);
      return card;
    });

  memoryGame.innerHTML = "";
  cards.forEach(card => memoryGame.appendChild(card));
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const match =
    firstCard.querySelector('.front-face').style.backgroundImage ===
    secondCard.querySelector('.front-face').style.backgroundImage;

  if (match) {
    disableCards();
  } else {
    unflipCards();
  }

  moves++;
  movesText.textContent = moves;
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();

  if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
    setTimeout(() => {
      gameContainer.classList.add('hidden');
      winScreen.classList.remove('hidden');
    }, 600);
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 900);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  createBoard();
});

restartBtn.addEventListener('click', () => {
  winScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  moves = 0;
  movesText.textContent = moves;
  createBoard();
});
