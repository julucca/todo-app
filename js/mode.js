const $toggleModeBtn = document.querySelector('[data-mode]');
const $htmlElement = document.documentElement;

const storedMode = localStorage.getItem("mode");

if (storedMode) {
  $htmlElement.dataset.theme = storedMode;
  $toggleModeBtn.innerHTML =
    storedMode === "dark"
      ? '<img src="./assets/img/icon-sun.svg" alt="Ícone do light mode" />'
      : '<img src="./assets/img/icon-moon.svg" alt="Ícone do dark mode" />';
}

$toggleModeBtn.addEventListener("click", () => {
  let mode = $htmlElement.dataset.theme === "dark" ? "light" : "dark";
  $htmlElement.dataset.theme = mode;
  $toggleModeBtn.innerHTML =
    mode === "dark"
      ? '<img src="./assets/img/icon-sun.svg" alt="Ícone do light mode" />'
      : '<img src="./assets/img/icon-moon.svg" alt="Ícone do dark mode" />';
  localStorage.setItem("mode", mode);
});