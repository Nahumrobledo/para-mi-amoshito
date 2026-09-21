// ==========================================
// CONFIGURACIÓN DE FECHA (21 DE JUNIO DE 2026)
// ==========================================
const relationshipStart = new Date(2026, 5, 21, 0, 0, 0);

const welcome = document.getElementById("welcome");
const mainContent = document.getElementById("main-content");
const openButton = document.getElementById("open-surprise");
const surpriseButton = document.getElementById("surprise-button");
const surpriseMessage = document.getElementById("surprise-message");
const loveExplosionButton = document.getElementById("love-explosion");
const heartsContainer = document.getElementById("hearts-container");

const messages = [
  "Te amo muchísimo, amoshito. ❤️",
  "Gracias por hacer mis días más bonitos. ❤️",
  "Siempre voy a elegirte a ti. ❤️",
  "Eres mi persona favorita en el mundo. ❤️",
  "Contigo quiero crear muchísimos recuerdos. ❤️",
  "Tu sonrisa es uno de mis lugares favoritos. ❤️",
  "Aunque estemos lejos, siempre estás conmigo. ❤️",
  "Estoy muy orgulloso de ti y de todo lo que haces. ❤️",
  "Vale por un abrazo enorme y muchos besitos. ❤️",
  "Desde que llegaste, mi corazón se siente en casa. ❤️"
];

let lastMessageIndex = -1;

if (openButton) {
  openButton.addEventListener("click", function () {
    welcome.classList.add("fade-out");
    createHeartBurst(28);

    setTimeout(function () {
      welcome.style.display = "none";
      mainContent.classList.remove("hidden");
      document.body.style.overflowY = "auto";
      startRevealAnimations();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  });
}

if (surpriseButton) {
  surpriseButton.addEventListener("click", function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * messages.length);
    } while (newIndex === lastMessageIndex && messages.length > 1);

    lastMessageIndex = newIndex;
    surpriseMessage.style.opacity = "0";
    surpriseMessage.style.transform = "scale(0.96)";

    setTimeout(function () {
      surpriseMessage.textContent = messages[newIndex];
      surpriseMessage.style.opacity = "1";
      surpriseMessage.style.transform = "scale(1)";
    }, 220);

    createHeartBurst(12);
  });
}

if (loveExplosionButton) {
  loveExplosionButton.addEventListener("click", function () {
    createHeartBurst(55);
    loveExplosionButton.textContent = "Y te amaré cada día más ❤️";
  });
}

function updateCounter() {
  const now = new Date();
  if (now < relationshipStart) return;

  let cursor = new Date(relationshipStart);
  let months = 0;

  while (true) {
    const nextMonth = new Date(cursor);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    if (nextMonth <= now) {
      months += 1;
      cursor = nextMonth;
    } else {
      break;
    }
  }

  const remainingMilliseconds = now - cursor;
  const totalSeconds = Math.floor(remainingMilliseconds / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (document.getElementById("months")) {
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }
}

function createFloatingHeart(extraClass) {
  if (!heartsContainer) return;
  const heart = document.createElement("span");
  const size = Math.random() * 20 + 16;
  const duration = Math.random() * 5 + 7;

  heart.className = ("floating-heart " + (extraClass || "")).trim();
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = size + "px";
  heart.style.animationDuration = duration + "s";

  heartsContainer.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, duration * 1000);
}

function createHeartBurst(amount) {
  for (let i = 0; i < amount; i += 1) {
    setTimeout(function () {
      createFloatingHeart("burst-heart");
    }, i * 45);
  }
}

function startRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}

function buscarOtraImagen(imagen) {
  if (!imagen.dataset.images) return;
  const rutas = imagen.dataset.images.split(",").map(r => r.trim());
  let indiceActual = Number(imagen.dataset.imageIndex || 0);
  indiceActual++;
  if (indiceActual < rutas.length) {
    imagen.dataset.imageIndex = indiceActual;
    imagen.src = rutas[indiceActual];
  }
}

setInterval(createFloatingHeart, 850);
updateCounter();
setInterval(updateCounter, 1000);

// ==========================================
// ACTIVIDAD DE SOBRES INTERACTIVOS
// ==========================================
const frasesSobres = {
  1: [
    "Me encanta cuando me hablas de tu día y de cada cosa que te pasa. ❤️",
    "Amo lo natural que se siente hablar contigo de cualquier tema. ❤️",
    "Me encanta tu risa y la forma en la que me haces sonreír. ❤️",
    "Simplemente me fascina todo de ti, amoshito. ❤️"
  ],
  2: [
    "Nuestras desveladas platicando de todo y sintiéndonos tan cerca. ❤️",
    "Esos momentos que pasamos riendo se vuelven inolvidables. ❤️",
    "Cada conversación bonita la guardo con mucho cariño. ❤️",
    "Cualquier momento, si es contigo, es perfecto. ❤️"
  ],
  3: [
    "Me das una tranquilidad y felicidad que no cambiaría por nada. ❤️",
    "Saber que estás ahí hace que mis días sean mucho mejores. ❤️",
    "Siento una alegría enorme cada vez que veo un mensaje tuyo. ❤️",
    "Me haces sentir la persona más afortunada del mundo. ❤️"
  ],
  4: [
    "Quiero seguir creando recuerdos bonitos contigo día a día. ❤️",
    "Deseo que sigamos apoyándonos en todo lo que nos propongamos. ❤️",
    "Que nunca nos falten las risas ni las ganas de estar juntitos. ❤️",
    "Celebrar no solo 3 meses, sino muchísimos más a tu lado. ❤️"
  ]
};

const indicesSobres = { 1: 0, 2: 0, 3: 0, 4: 0 };

function cambiarFrase(card, sobreNum) {
  const front = card.querySelector(".envelope-front");
  const back = card.querySelector(".envelope-back");
  const textElem = card.querySelector(".note-text");

  if (!front || !back || !textElem) return;

  if (front.style.display !== "none") {
    front.style.display = "none";
    back.style.display = "flex";
    card.classList.add("opened");
  }

  const lista = frasesSobres[sobreNum];
  const indiceActual = indicesSobres[sobreNum];

  textElem.style.animation = "none";
  void textElem.offsetWidth;
  textElem.style.animation = "fadeInText 0.35s ease-in-out forwards";

  textElem.innerText = lista[indiceActual];
  indicesSobres[sobreNum] = (indiceActual + 1) % lista.length;

  lanzarCorazonFlotante(card);
}

function lanzarCorazonFlotante(card) {
  const heart = document.createElement("span");
  heart.innerText = "❤️";
  heart.style.position = "absolute";
  heart.style.fontSize = "1.3rem";
  heart.style.pointerEvents = "none";
  heart.style.left = Math.random() * 80 + 10 + "%";
  heart.style.top = "40%";
  heart.style.animation = "floatSparkle 1s ease-out forwards";

  card.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

// ==========================================
// MINIJUEGO 1: DETECTOR DE AMOR
// ==========================================
let detectorEscaneando = false;

function probarDetector() {
  if (detectorEscaneando) return;
  detectorEscaneando = true;

  const bar = document.getElementById("love-bar");
  const percentText = document.getElementById("detector-percent");
  const msg = document.getElementById("detector-message");
  const btn = document.getElementById("scan-love-btn");

  btn.disabled = true;
  msg.innerText = "Escaneando nivel de amor...";
  bar.style.width = "0%";
  
  let val = 0;
  const interval = setInterval(() => {
    val += Math.floor(Math.random() * 40) + 20;
    if (val >= 1000) {
      val = 1000;
      clearInterval(interval);
      
      bar.style.width = "100%";
      percentText.innerText = "1000%";
      msg.innerText = "¡Nivel de amor fuera de escala! Te amo infinito amoshito. ❤️";
      btn.disabled = false;
      detectorEscaneando = false;

      for (let i = 0; i < 12; i++) {
        setTimeout(() => lanzarCorazonFlotante(btn), i * 60);
      }
    } else {
      bar.style.width = (val / 10) + "%";
      percentText.innerText = val + "%";
    }
  }, 100);
}

// ==========================================
// MINIJUEGO 2: ROMPECABEZAS DE LA CARTA
// ==========================================
let seleccionPieza = null;

function moverPieza(pieza) {
  if (!seleccionPieza) {
    seleccionPieza = pieza;
    pieza.classList.add("selected");
  } else if (seleccionPieza === pieza) {
    seleccionPieza.classList.remove("selected");
    seleccionPieza = null;
  } else {
    const tempHTML = pieza.innerHTML;
    const tempOrder = pieza.getAttribute("data-order");

    pieza.innerHTML = seleccionPieza.innerHTML;
    pieza.setAttribute("data-order", seleccionPieza.getAttribute("data-order"));

    seleccionPieza.innerHTML = tempHTML;
    seleccionPieza.setAttribute("data-order", tempOrder);

    seleccionPieza.classList.remove("selected");
    seleccionPieza = null;

    verificarPuzzle();
  }
}

function verificarPuzzle() {
  const piezas = document.querySelectorAll(".puzzle-piece");
  let correcto = true;

  piezas.forEach((p, idx) => {
    if (parseInt(p.getAttribute("data-order")) !== idx + 1) {
      correcto = false;
    }
  });

  const status = document.getElementById("puzzle-status");
  if (correcto) {
    status.innerText = "¡Perfecto! Carta armada con éxito. ❤️";
    status.style.color = "#ff85a1";
    piezas.forEach(p => p.classList.add("solved"));
    createHeartBurst(20);
  } else {
    status.innerText = "Sigue moviendo las piezas para armar la historia...";
  }
}

// ==========================================
// MINIJUEGO 3: LA BOLA MÁGICA
// ==========================================
const respuestasBola = [
  " Eres el amor de mi vida. ❤️",
  "El destino dice que estos 3 meses son solo el inicio. ❤️",
  " En cada universo volvería a elegirte a ti. ❤️",
  "Las estrellas predicen miles de momentos juntos más. ❤️",
  " Cada mensaje tuyo le saca una sonrisa enorme. ❤️"
];

function consultarBolaMagica() {
  const text = document.getElementById("ball-response");
  const ball = document.querySelector(".magic-ball");

  ball.classList.add("shaking");
  text.innerText = "Consultando a las estrellas...";

  setTimeout(() => {
    ball.classList.remove("shaking");
    const res = respuestasBola[Math.floor(Math.random() * respuestasBola.length)];
    text.innerText = res;
    lanzarCorazonFlotante(ball);
  }, 800);
}

// ==========================================
// FUNCIONES ADICIONALES
// ==========================================
function desplegarCarta(card) {
  if (card.classList.contains('unfolded')) return;
  card.classList.add('unfolded');
  for (let i = 0; i < 5; i++) {
    setTimeout(() => lanzarCorazonFlotante(card), i * 80);
  }
}

let holdTimer;
function startHeartbeat(btn) {
  if (btn.classList.contains('completed')) return;
  document.oncontextmenu = function() { return false; };
  btn.classList.add('holding');

  holdTimer = setTimeout(() => {
    btn.classList.remove('holding');
    btn.classList.add('completed');
    btn.style.border = "none";
    btn.style.background = "linear-gradient(135deg, #ff4d6d, #ff758f)";
    
    document.getElementById('hold-instruction').style.display = 'none';
    document.querySelector('.heartbeat-message').classList.remove('hidden');

    for (let i = 0; i < 25; i++) {
      setTimeout(() => lanzarCorazonFlotante(btn), i * 60);
    }
  }, 3000);
}

function stopHeartbeat(btn) {
  if (btn.classList.contains('completed')) return;
  btn.classList.remove('holding');
  clearTimeout(holdTimer);
  document.oncontextmenu = null;
}
