export { hamburgerMenu };

// Login button
const headerLoginButton = document.querySelector("#header-login-button");

headerLoginButton.addEventListener("click", () => {
  window.location.href = "/pages/login.html";
});

// Create listing button
const headerCreateListingButton = document.querySelector(
  "#header-create-listing-button"
);

headerCreateListingButton.addEventListener("click", () => {
  window.location.href = "/pages/create_listing.html";
});

// Hamburger menu button
const hamburgerMenuButton = document.querySelector(".hamburger-menu-button");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerMenuButton.addEventListener("click", () => {
  if (hamburgerMenu.style.display === "none") {
    hamburgerMenu.style.display = "flex";
  } else {
    hamburgerMenu.style.display = "none";
  }
});

// Profile picture dropdown menu
const userPfp = document.querySelector("#user-pfp");
const pfpDropdownMenu = document.querySelector("#pfp-dropdown-menu");

userPfp.addEventListener("click", () => {
  if (pfpDropdownMenu.style.display == "flex") {
    pfpDropdownMenu.style.display = "none";
  } else {
    pfpDropdownMenu.style.display = "flex";
  }
});

userPfp.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    userPfp.click();
  }
});
