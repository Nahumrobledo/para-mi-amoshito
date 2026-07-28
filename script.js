// ==============================
// FECHA EN QUE COMENZARON
// Meses en JavaScript: enero = 0, junio = 5.
// Fecha usada: 21 de junio de 2026.
// ==============================
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

openButton.addEventListener("click", () => {
  welcome.classList.add("fade-out");

  createHeartBurst(28);

  setTimeout(() => {
    welcome.style.display = "none";
    mainContent.classList.remove("hidden");
    document.body.style.overflowY = "auto";
    startRevealAnimations();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 700);
});

surpriseButton.addEventListener("click", () => {
  let newIndex;

  do {
    newIndex = Math.floor(Math.random() * messages.length);
  } while (newIndex === lastMessageIndex && messages.length > 1);

  lastMessageIndex = newIndex;
  surpriseMessage.style.opacity = "0";
  surpriseMessage.style.transform = "scale(0.96)";

  setTimeout(() => {
    surpriseMessage.textContent = messages[newIndex];
    surpriseMessage.style.opacity = "1";
    surpriseMessage.style.transform = "scale(1)";
  }, 220);

  createHeartBurst(12);
});

loveExplosionButton.addEventListener("click", () => {
  createHeartBurst(55);
  loveExplosionButton.textContent = "Y te amaré cada día más ❤️";
});

surpriseMessage.style.transition = "opacity 0.25s ease, transform 0.25s ease";

function updateCounter() {
  const now = new Date();

  if (now < relationshipStart) {
    document.getElementById("months").textContent = "0";
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
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

  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

function createFloatingHeart(extraClass = "") {
  const heart = document.createElement("span");
  const heartOptions = ["❤️", "💖", "💕", "💗", "💘"];
  const size = Math.random() * 20 + 16;
  const duration = Math.random() * 5 + 7;

  heart.className = `floating-heart ${extraClass}`.trim();
  heart.textContent =
    heartOptions[Math.floor(Math.random() * heartOptions.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

function createHeartBurst(amount) {
  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => createFloatingHeart("burst-heart"), i * 45);
  }
}

function startRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
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

  revealElements.forEach((element) => observer.observe(element));
}

// Corazones que aparecen de forma continua.
setInterval(() => {
  createFloatingHeart();
}, 850);

updateCounter();
setInterval(updateCounter, 1000);
