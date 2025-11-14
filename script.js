const obras = [
  { id: 1, nombre: "La Mona Lisa", artista: "Leonardo da Vinci", año: 1503, descripcion: "Una de las pinturas más famosas del mundo, célebre por su sonrisa enigmática.", img: "monalisa.jpg" },
  { id: 2, nombre: "El Grito", artista: "Edvard Munch", año: 1893, descripcion: "Icono del expresionismo, representa la angustia existencial humana.", img: "scream.jpg" },
  { id: 3, nombre: "La Noche Estrellada", artista: "Vincent van Gogh", año: 1889, descripcion: "Paisaje nocturno con un cielo en movimiento lleno de energía.", img: "lanochestrellada.jpg" },
  { id: 4, nombre: "La Joven de la Perla", artista: "Johannes Vermeer", año: 1665, descripcion: "Conocida como la 'Mona Lisa del Norte', destaca por su iluminación y mirada.", img: "laperla.jpg" },
  { id: 5, nombre: "La Persistencia de la Memoria", artista: "Salvador Dalí", año: 1931, descripcion: "Famosa por sus relojes derretidos, simboliza la distorsión del tiempo.", img: "persistencia.jpg" }
];

// Duplicar cartas
let cartas = [...obras, ...obras];
cartas = cartas.sort(() => Math.random() - 0.5);

let primera = null;
let segunda = null;
let bloqueado = false;
let paresEncontrados = 0;

const tablero = document.getElementById("tablero");
const timer = document.getElementById("timer");

let tiempo = 45 * 60; 
let intervalo;

function iniciarTimer() {
  intervalo = setInterval(() => {
      tiempo--;
      const min = Math.floor(tiempo / 60);
      const seg = tiempo % 60;
      timer.textContent = `${min}:${seg.toString().padStart(2, "0")}`;

      if (tiempo <= 0) perder();
  }, 1000);
}

function crearTablero() {
  tablero.innerHTML = "";
  cartas.forEach((carta) => {
      const div = document.createElement("div");
      div.classList.add("carta");
      div.dataset.id = carta.id;

      div.innerHTML = `<img src="back.jpg">`;

      div.addEventListener("click", () => {
          if (bloqueado) return;
          if (div.classList.contains("descubierta")) return;

          div.classList.add("descubierta");
          div.innerHTML = `<img src="${carta.img}">`;

          if (!primera) {
              primera = div;
          } else {
              segunda = div;
              validarPareja();
          }
      });

      tablero.appendChild(div);
  });
}

function validarPareja() {
  bloqueado = true;

  if (primera.dataset.id === segunda.dataset.id) {
      paresEncontrados++;

      if (paresEncontrados === obras.length) ganar();

      primera = null;
      segunda = null;
      bloqueado = false;
  } else {
      setTimeout(() => {
          primera.innerHTML = `<img src="back.jpg">`;
          segunda.innerHTML = `<img src="back.jpg">`;

          primera.classList.remove("descubierta");
          segunda.classList.remove("descubierta");

          primera = null;
          segunda = null;
          bloqueado = false;
      }, 1000);
  }
}

function ganar() {
  clearInterval(intervalo);
  document.getElementById("ganaste").classList.remove("oculto");
}

function perder() {
  clearInterval(intervalo);
  document.getElementById("perdiste").classList.remove("oculto");
}

function mostrarGaleria() {
  document.getElementById("galeria").classList.remove("oculto");
  const cont = document.getElementById("contenedor-obras");

  obras.forEach(o => {
      cont.innerHTML += `
          <div class="obra">
              <img src="${o.img}">
              <h3>${o.nombre} — ${o.artista}</h3>
              <p><strong>Año:</strong> ${o.año}</p>
              <p>${o.descripcion}</p>
          </div>
      `;
  });
}

document.getElementById("btnComenzar").onclick = () => {
  document.getElementById("inicio").style.display = "none";
  timer.style.display = "block";
  crearTablero();
  iniciarTimer();
};
