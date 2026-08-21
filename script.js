// ==========================================
// CONFIGURACIÓN DE FECHA
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
  "Gracias por hacer mis días más bonitos.",
  "Siempre voy a elegirte a ti.",
  "Eres mi persona favorita en el mundo.",
  "Contigo quiero crear muchísimos recuerdos.",
  "Tu sonrisa es uno de mis lugares favoritos.",
  "Aunque estemos lejos, siempre estás conmigo.",
  "Estoy muy orgulloso de ti y de todo lo que haces.",
  "Vale por un abrazo enorme y muchos besitos. 😚",
  "Desde que llegaste, mi corazón se siente en casa."
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

if (surpriseMessage) {
  surpriseMessage.style.transition = "opacity 0.25s ease, transform 0.25s ease";
}

function updateCounter() {
  const now = new Date();

  if (now < relationshipStart) {
    if (document.getElementById("months")) {
      document.getElementById("months").textContent = "0";
      document.getElementById("days").textContent = "0";
      document.getElementById("hours").textContent = "0";
      document.getElementById("minutes").textContent = "0";
      document.getElementById("seconds").textContent = "0";
    }
    return;
  }

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
  const heartOptions = ["❤️", "💖", "💕", "💗", "💘"];
  const size = Math.random() * 20 + 16;
  const duration = Math.random() * 5 + 7;

  heart.className = ("floating-heart " + (extraClass || "")).trim();
  heart.textContent =
    heartOptions[Math.floor(Math.random() * heartOptions.length)];
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
    {
      threshold: 0.14
    }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}

function buscarOtraImagen(imagen) {
  if (!imagen.dataset.images) return;
  const rutas = imagen.dataset.images.split(",").map(function (ruta) {
    return ruta.trim();
  });
  let indiceActual = Number(imagen.dataset.imageIndex || 0);
  indiceActual++;
  if (indiceActual < rutas.length) {
    imagen.dataset.imageIndex = indiceActual;
    imagen.src = rutas[indiceActual];
  } else {
    imagen.onerror = null;
  }
}

setInterval(function () {
  createFloatingHeart();
}, 850);

updateCounter();
setInterval(updateCounter, 1000);

// ==========================================
// ACTIVIDAD DE SOBRES INTERACTIVOS
// ==========================================

const frasesSobres = {
  1: [
    "Me encanta cuando me hablas de tu dia y de cada cosa que te pasa. ❤️",
    "Amo lo natural que se siente hablar contigo de cualquier tema. 💕",
    "Me encanta tu risa y la forma tan bonita en la que me me haces sonreír. ✨",
    "Simplemente me fascina todo de ti, amoshito. 💖"
  ],
  2: [
    "Nuestras desveladas platicando de todo y sintiéndonos tan cerca. ❤️",
    "Esos momentos que pasamos riendo se vuelven inolvidables. 💕",
    "Cada conversación bonita que guardo con mucho cariño en mi corazón. ✨",
    "Cualquier momento, por simple que sea, si es contigo es perfecto. 💖"
  ],
  3: [
    "Me das una tranquilidad y una felicidad que no cambiaria por nada. ❤️",
    "Saber que estás ahí hace que mis días sean mucho mejores. 💕",
    "Siento una alegría enorme cada vez que veo un mensaje tuyo. ✨",
    "Me haces sentir la persona más afortunada por tenerte a mi lado. 💖"
  ],
  4: [
    "Quiero seguir creando recuerdos bonitos contigo día a día. ❤️",
    "Deseo que sigamos apoyándonos en todo lo que nos propongamos. 💕",
    "Que nunca nos falten las risas ni las ganas de estar juntitosh. ✨",
    "Celebrar no solo 2 meses, sino muchísimos más a tu lado. 💖"
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
  const iconos = ["❤️", "💖", "✨", "💕", "💗"];

  heart.innerText = iconos[Math.floor(Math.random() * iconos.length)];
  heart.style.position = "absolute";
  heart.style.fontSize = "1.3rem";
  heart.style.pointerEvents = "none";
  heart.style.left = Math.random() * 80 + 10 + "%";
  heart.style.top = "40%";
  heart.style.animation = "floatSparkle 1s ease-out forwards";

  card.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, 1000);
}// BANCO DE RESULTADOS PARA LA RULETA
const opcionesRuleta = [
  {
    icon: "🌙",
    titulo: "Nuestras desveladas",
    texto: "Cualquier noche hablando contigo es el mejor momento de mi día. No cambio nuestras pláticas por nada. ❤️"
  },
  {
    icon: "🫂",
    titulo: "Lo que haria al verte",
    texto: "Darte el abrazo más fuerte del mundo y nunca soltarte. 💕"
  },
  {
    icon: "✨",
    titulo: "Lo que me haces sentir",
    texto: "Una paz y una felicidad increíble. Tenerte en mi vida hace que todo se sienta mucho más bonito. 💖"
  },
  {
    icon: "🎮",
    titulo: "Nuestra complicidad",
    texto: "Me encanta reírme contigo, compartir nuestras cosas y tener nuestros propios chistes que solo nosotros entendemos. ✨"
  },
  {
    icon: "🚀",
    titulo: "Nuestro futuro",
    texto: "Estos 2 meses son solo el primer capítulo. Se vienen muchísimos momentos hermosos juntos. ❤️"
  }
];

function girarRuleta() {
  const box = document.querySelector('.wheel-box');
  const icon = document.getElementById('wheel-icon');
  const title = document.getElementById('wheel-title');
  const text = document.getElementById('wheel-text');
  const btn = document.getElementById('spin-btn');

  if (!box || !btn) return;

  btn.disabled = true;
  box.classList.add('spinning');
  title.innerText = "Girando...";
  text.innerText = "Buscando un recuerdo especial...";

  setTimeout(() => {
    box.classList.remove('spinning');
    btn.disabled = false;

    const resultado = opcionesRuleta[Math.floor(Math.random() * opcionesRuleta.length)];
    icon.innerText = resultado.icon;
    title.innerText = resultado.titulo;
    text.innerText = resultado.texto;

    // Lluvia de corazones al revelar
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        lanzarCorazonFlotante(box);
      }, i * 80);
    }
  }, 1000);
}// FUNCIÓN PARA EL RASPA Y GANA
function rasparTarjeta(card) {
  if (card.classList.contains('scratched')) return;

  card.classList.add('scratched');

  // Lluvia de corazones al revelar la tarjeta
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      lanzarCorazonFlotante(card);
    }, i * 80);
  }
}
// FUNCIÓN PARA DESPLEGAR CARTAS CON CINTA
function desplegarCarta(card) {
  if (card.classList.contains('unfolded')) return;

  card.classList.add('unfolded');

  // Lluvia corta de corazones al abrir
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      lanzarCorazonFlotante(card);
    }, i * 80);
  }
}
// FUNCIÓN PARA EL BOTÓN DE LATIDOS
let holdTimer;

function startHeartbeat(btn) {
  if (btn.classList.contains('completed')) return; // Si ya lo hizo, no hace nada

  // Prevenir menú contextual en celulares
  document.oncontextmenu = function() { return false; };

  btn.classList.add('holding');

  // Empieza a contar 3 segundos (3000 milisegundos)
  holdTimer = setTimeout(() => {
    btn.classList.remove('holding');
    btn.classList.add('completed');
    btn.style.border = "none";
    btn.style.background = "linear-gradient(135deg, #ff4d6d, #ff758f)";
    
    document.getElementById('hold-instruction').style.display = 'none';
    document.querySelector('.heartbeat-message').classList.remove('hidden');

    // Explosión final de corazones
    for (let i = 0; i < 25; i++) {
      setTimeout(() => lanzarCorazonFlotante(btn), i * 60);
    }
  }, 3000);
}

function stopHeartbeat(btn) {
  if (btn.classList.contains('completed')) return;
  
  // Si suelta antes de los 3 segundos, se cancela y se vacía
  btn.classList.remove('holding');
  clearTimeout(holdTimer);
  document.oncontextmenu = null; // Restaurar menú
}