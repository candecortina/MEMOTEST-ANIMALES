const obras = [
  {
      nombre: "La noche estrellada",
      imagen: "noche.jpg",
      descripcion: "Obra de Vincent van Gogh, 1889."
  },
  {
      nombre: "El grito",
      imagen: "grito.jpg",
      descripcion: "Obra de Edvard Munch, 1893."
  },
  {
      nombre: "La persistencia de la memoria",
      imagen: "relojes.jpg",
      descripcion: "Obra surrealista de Salvador Dalí, 1931."
  },
  {
      nombre: "La joven de la perla",
      imagen: "perla.jpg",
      descripcion: "Obra de Johannes Vermeer, alrededor de 1665."
  }
];

// duplicar para hacer pares
let cartas = [...obras, ...obras];

// mezclarlas
cartas = cartas.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("gameBoard");
let firstCard = null;
let lockBoard = false;

// Crear tablero
cartas.forEach((obra, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.index = index;
  card.dataset.nombre = obra.nombre;

  card.innerHTML = `
      <div class="card-back">ART MATCH</div>
      <div class="card-front" style="background-image: url('${obra.imagen}')"></div>
  `;

  card.addEventListener("click", () => flipCard(card, obra));
  gameBoard.appendChild(card);
});

// Girar tarjeta
function flipCard(card, obra) {
  if (lockBoard || card === firstCard) return;

  card.classList.add("flip");

  if (!firstCard) {
      firstCard = card;
      return;
  }

  lockBoard = true;

  // Coincidencia
  if (card.dataset.nombre === firstCard.dataset.nombre) {
      showInfo(obra);
      disableCards(card, firstCard);
  } else {
      unflipCards(card, firstCard);
  }
}

// Deshabilitar cuando coincide
function disableCards(card1, card2) {
  setTimeout(() => {
      card1.style.pointerEvents = "none";
      card2.style.pointerEvents = "none";
      resetBoard();
  }, 800);
}

// Desvoltear si no coinciden
function unflipCards(card1, card2) {
  setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, lockBoard] = [null, false];
}

// Modal
const modal = document.getElementById("infoModal");
const closeModal = document.getElementById("closeModal");
const obraTitulo = document.getElementById("obraTitulo");
const obraDescripcion = document.getElementById("obraDescripcion");

function showInfo(obra) {
  obraTitulo.innerText = obra.nombre;
  obraDescripcion.innerText = obra.descripcion;
  modal.style.display = "block";
}

closeModal.onclick = () => {
  modal.style.display = "none";
};
