import "./style.css";

const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");
const choices = document.querySelector("#choices");
const invitation = document.querySelector(".invitation");
const answer = document.querySelector("#answer");
const bodySong = document.querySelector("#bodySong");

// Browsers may still require a gesture before allowing audible autoplay.
bodySong.play().catch(() => {});
window.addEventListener("pointerdown", () => bodySong.play().catch(() => {}), { once: true });
window.addEventListener("keydown", () => bodySong.play().catch(() => {}), { once: true });

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
  document.querySelector(".stage").classList.add("accepted");

  window.setTimeout(() => {
    invitation.hidden = true;
    answer.hidden = false;
    answer.classList.add("visible");
  }, 260);
});

window.addEventListener("resize", () => {
  if (noButton.dataset.evaded) moveNoButton();
});
