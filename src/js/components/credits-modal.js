import { hamburgerMenu } from "/src/js/components/header.js";

const creditsBtn = document.querySelector(".credits-button");
const creditsBtnMobile = document.querySelector("#credits-btn-mobile");
const creditsModalContainer = document.querySelector(
  ".credits-modal-container"
);
const modalBackground = document.querySelector(".modal-background");
const modalX = document.querySelector(".modal-x");

creditsBtn.onclick = function () {
  creditsModalContainer.style.display = "flex";
};

creditsBtnMobile.onclick = function () {
  hamburgerMenu.style.display = "none";
  creditsModalContainer.style.display = "flex";
};

modalBackground.addEventListener("click", function () {
  creditsModalContainer.style.display = "none";
});

modalX.addEventListener("click", function () {
  creditsModalContainer.style.display = "none";
});

creditsBtn.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    creditsBtn.click();
  }
});

modalX.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    modalX.click();
  }
});
