const animales = [
    "🦣 Mamut",
    "🦤 Dodo",
    "🦕 Brontosaurio",
    "🦏 Rinoceronte lanudo",
    "🦅 Moa",
    "🐅 Tigre de Tasmania",
    "🐘 Elefante antiguo",
    "🦈 Megalodón"
  ];
  
  let cartas = [...animales, ...animales];
  let primera = null;
  let bloqueo = false;
  let encontrados = 0;
  
  const juego = document.getElementById("juego");
  const resultado = document.getElementById("resultado");
  
  function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function crearTablero() {
    juego.innerHTML = "";
    mezclar(cartas);
    cartas.forEach((animal) => {
      const div = document.createElement("div");
      div.classList.add("carta");
      div.dataset.valor = animal;
      div.addEventListener("click", () => voltearCarta(div));
      juego.appendChild(div);
    });
  }
  
  function voltearCarta(carta) {
    if (bloqueo || carta.classList.contains("volteada")) return;
    carta.classList.add("volteada");
    carta.textContent = carta.dataset.valor;
  
    if (!primera) {
      primera = carta;
    } else {
      bloqueo = true;
      if (primera.dataset.valor === carta.dataset.valor) {
        primera = null;
        bloqueo = false;
        encontrados++;
        if (encontrados === animales.length) {
          resultado.textContent =
            "🌿 ¡Increíble memoria! Los animales extintos revivieron en tu mente.";
        }
      } else {
        setTimeout(() => {
          primera.classList.remove("volteada");
          carta.classList.remove("volteada");
          carta.textContent = "";
          primera.textContent = "";
          primera = null;
          bloqueo = false;
        }, 1000);
      }
    }
  }
  
  function reiniciarJuego() {
    primera = null;
    bloqueo = false;
    encontrados = 0;
    resultado.textContent = "";
    crearTablero();
  }
  
  crearTablero();
  