const mobileMenuSignedOut = document.querySelector("#mobile-menu-signed-out");
const mobileMenuSignedIn = document.querySelector("#mobile-menu-signed-in");
const headerLoggedOut = document.querySelector("#header-login-button");
const headerLoggedIn = document.querySelector("#header-logged-in");

try {
  /**
   * Checks for an accessToken in local storage to determine if user is logged in or not, and then displays different header buttons for logged in or logged out users.
   */
  (function () {
    if (
      localStorage.getItem("accessToken") === "" ||
      localStorage.getItem("accessToken") === null
    ) {
      console.log("placeholder: user not logged in");
      mobileMenuSignedIn.style.display = "none";
      mobileMenuSignedOut.style.display = "flex";
      headerLoggedIn.style.display = "none";
      headerLoggedOut.style.display = "flex";
    } else {
      console.log("placeholder: user logged in");
      mobileMenuSignedOut.style.display = "none";
      mobileMenuSignedIn.style.display = "flex";
      headerLoggedOut.style.display = "none";
      headerLoggedIn.style.display = "flex";
    }
  })();
} catch (e) {
  console.log(e);
}
