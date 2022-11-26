const headerLoginButton = document.querySelector("#header-login-button");

headerLoginButton.addEventListener("click", () => {
  window.location.href = "/pages/login.html";
});

const headerCreateListingButton = document.querySelector(
  "#header-create-listing-button"
);

headerCreateListingButton.addEventListener("click", () => {
  window.location.href = "/pages/create_listing.html";
});

const hamburgerMenuButton = document.querySelector(".hamburger-menu-button");

const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerMenuButton.addEventListener("click", () => {
  console.log("button clicked");
  if (hamburgerMenu.style.display === "none") {
    hamburgerMenu.style.display = "flex";
  } else {
    hamburgerMenu.style.display = "none";
  }
});
