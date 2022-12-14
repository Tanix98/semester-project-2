import { apiBaseUrl, userName, userAvatar } from "/src/js/api.js";
import { userToken } from "/src/js/localStorage.js";
export { hamburgerMenu };

// Login button
const headerLoginButton = document.querySelector("#header-login-button");

try {
  headerLoginButton.addEventListener("click", () => {
    window.location.href = "/pages/login.html";
  });
} catch (e) {
  console.log(e);
}

// Create listing button
const headerCreateListingButton = document.querySelector(
  "#header-create-listing-button"
);

try {
  headerCreateListingButton.addEventListener("click", () => {
    window.location.href = "/pages/create_listing.html";
  });
} catch (e) {
  console.log(e);
}

// Hamburger menu button
const hamburgerMenuButton = document.querySelector(".hamburger-menu-button");
const hamburgerMenu = document.querySelector(".hamburger-menu");

try {
  hamburgerMenuButton.addEventListener("click", () => {
    if (hamburgerMenu.style.display === "none") {
      hamburgerMenu.style.display = "flex";
    } else {
      hamburgerMenu.style.display = "none";
    }
  });
} catch (e) {
  console.log(e);
}

// Profile picture dropdown menu
const userPfp = document.querySelector("#user-pfp");
const pfpDropdownMenu = document.querySelector("#pfp-dropdown-menu");
const pageBody = document.body;

if (userAvatar == "") {
  userPfp.src = "/resources/icons/profile_default.svg";
} else {
  userPfp.src = userAvatar;
  userPfp.style.border = "1px solid white";
}

try {
  userPfp.addEventListener("click", () => {
    if (pfpDropdownMenu.style.display == "flex") {
      pfpDropdownMenu.style.display = "none";
    } else {
      pfpDropdownMenu.style.display = "flex";
    }
  });
} catch (e) {
  console.log(e);
}

try {
  userPfp.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      userPfp.click();
    }
  });
} catch (e) {
  console.log(e);
}

try {
  pageBody.addEventListener("click", function handleClick(event) {
    try {
      if (event.target == userPfp) {
        if (pfpDropdownMenu.style.display == "none;") {
          pfpDropdownMenu.style.display = "flex";
        }
      } else {
        pfpDropdownMenu.style.display = "none";
      }
    } catch (e) {
      console.log(e);
    }
  });
} catch (e) {
  console.log(e);
}

const myProfileBtn = document.querySelectorAll(".my-profile-btn");

try {
  for (let i = 0; i < myProfileBtn.length; i++) {
    myProfileBtn[i].addEventListener("click", () => {
      window.location.href = `/pages/profile.html?user=${userName}`;
    });
  }
} catch (e) {
  console.log(e);
}

const logOutBtn = document.querySelectorAll(".log-out-btn");

try {
  for (let i = 0; i < logOutBtn.length; i++) {
    logOutBtn[i].addEventListener("click", () => {
      window.localStorage.clear();
      document.location.reload();
    });
  }
} catch (e) {
  console.log(e);
}

const modalUserCreditAmount = document.querySelector("#user-credit-amount");

(async function fetchUserCreditAmount() {
  try {
    const response = await fetch(`${apiBaseUrl}/profiles/${userName}`, {
      method: "GET",
      headers: {
        "Authorization": userToken
      },
    });
    const data = await response.json();
    modalUserCreditAmount.innerHTML = data.credits;
  } catch (e) {
    console.log(e);
  }
})();
