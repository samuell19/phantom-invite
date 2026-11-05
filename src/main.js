import "./style.css";

const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");
const choices = document.querySelector("#choices");
const invitation = document.querySelector(".invitation");
const answer = document.querySelector("#answer");
const bodySong = document.querySelector("#bodySong");
const musicToggles = [
  document.querySelector("#musicToggleIntro"),
  document.querySelector("#musicToggleFinal"),
];

function syncMusicLabels() {
  const playing = !bodySong.paused;
  musicToggles[0].textContent = playing ? "Pausar Body - Mother Mother" : "Tocar Body - Mother Mother";
  musicToggles[1].innerHTML = `${playing ? "Pausar Body" : "Tocar Body"} <span aria-hidden="true">&rarr;</span>`;
}

async function toggleMusic() {
  if (bodySong.paused) {
    try {
      await bodySong.play();
    } catch {
      return;
    }
  } else {
    bodySong.pause();
  }

  syncMusicLabels();
}

function moveNoButton() {
  const bounds = choices.getBoundingClientRect();
  const button = noButton.getBoundingClientRect();
  const limitX = Math.max(0, bounds.width - button.width);
  const limitY = Math.max(0, 118 - button.height);
  const x = Math.round(Math.random() * limitX);
  const y = Math.round(18 + Math.random() * limitY);

  noButton.style.transform = `translate(${x}px, ${y}px)`;
  noButton.dataset.evaded = "true";
}

function evade(event) {
  event.preventDefault();
  moveNoButton();
}

noButton.addEventListener("pointerenter", evade);
noButton.addEventListener("pointerdown", evade);
noButton.addEventListener("focus", evade);

yesButton.addEventListener("click", () => {
  invitation.classList.add("leaving");

  window.setTimeout(() => {
    invitation.hidden = true;
    answer.hidden = false;
    answer.classList.add("visible");
  }, 260);
});

musicToggles.forEach((button) => button.addEventListener("click", toggleMusic));
bodySong.addEventListener("play", syncMusicLabels);
bodySong.addEventListener("pause", syncMusicLabels);
bodySong.addEventListener("ended", syncMusicLabels);

window.addEventListener("resize", () => {
  if (noButton.dataset.evaded) moveNoButton();
});
