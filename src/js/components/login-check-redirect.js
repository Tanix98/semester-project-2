import { listingId } from "/src/js/queryString.js";

(function () {
  if (localStorage.getItem("accessToken") == "") {
    window.location.href = "/index.html";
  } else {
    if (window.location.pathname == "/pages/edit_listing.html") {
      if (listingId == null) {
        window.location.href = "/index.html";
      }
    }
  }
})();
