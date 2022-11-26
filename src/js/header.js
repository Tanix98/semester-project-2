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
