import { apiBaseUrl } from "/src/js/api.js";
import { userToken, userName } from "/src/js/localStorage.js";
import { profileUserName } from "/src/js/queryString.js";
// Trying to import byDateCreatedDescending from sort-listings.js breaks the entire script somehow, so I have to just copy & paste the byDateCreatedDescending function instead;
function byEndDateDescending(a, b) {
  if (a.endsAt > b.endsAt) {
    return 1;
  } else if (b.endsAt > a.endsAt) {
    return -1;
  } else {
    return 0;
  }
}

document.title = profileUserName + "'s profile - Scandinavian Auction House";

const profilePageInfo = document.querySelector("#profile-page-info");
const profilePageListings = document.querySelector("#profile-page-listings");

async function fetchListing(url) {
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.status == "Too Many Requests" || data.statusCode == 429) {
      profilePageListings.innerHTML = `<h4 class="red-color mt-4">Error: ${dataRaw.status}. Please wait a minute before trying again.</h4>`;
    }
    // Display report or edit pfp button
    function displayProfileBtns() {
      let displayReportUserBtn;
      let displayEditPfpBtn;
      if (data.name == userName) {
        displayReportUserBtn = "none";
        displayEditPfpBtn = "block";
      } else {
        displayReportUserBtn = "block";
        displayEditPfpBtn = "none";
      }
      return [displayReportUserBtn, displayEditPfpBtn];
    }
    const [displayReportUserBtn, displayEditPfpBtn] = displayProfileBtns();
    // Display default profile picture or custom profile picture
    function getProfileAvatar() {
      let profileAvatar;
      if (`${data.avatar}`) {
        profileAvatar = `${data.avatar}`;
      }
      if (
        `${data.avatar}` == "null" ||
        `${data.avatar}` === "" ||
        `${data.avatar}` === "undefined"
      ) {
        profileAvatar = "/resources/icons/profile_default.svg";
      }
      return [profileAvatar];
    }
    const [profileAvatar] = getProfileAvatar();
    // Generate profile page HTML
    profilePageInfo.innerHTML = `
                <img
                    src="${profileAvatar}"
                    class="profile-img m-auto rounded-circle"
                    alt="Profile picture"
                />
                <div class="d-flex flex-column flex-sm-row mt-3 mb-sm-1">
                    <div class="col-sm-4 col-md-3 col-xl-2"></div>
                    <h2 class="col-sm-4 col-md-6 col-xl-8 m-auto mb-1 mb-sm-0">${data.name}</h2>
                    <button
                    class="col-sm-4 col-md-3 col-xl-2 profile-button button-red-border header-buttons rounded-2 inter-semiBold m-auto"
                    id="report-user-button"
                    style="display: ${displayReportUserBtn}"
                    >
                    Report user
                    </button>
                    <button
                    class="button-dark-border profile-button col-sm-4 col-md-3 col-xl-2 header-buttons rounded-2 inter-semiBold m-auto"
                    id="edit-pfp-button"
                    style="display: ${displayEditPfpBtn}"
                    >
                    Edit profile picture
                    </button>
                </div>
          `;
    // Filter out closed listings, and sort by end date descending
    const activeListings = data.listings.filter(
      (x) => Date.parse(x.endsAt) > new Date()
    );
    const closedListings = data.listings.filter(
      (x) => Date.parse(x.endsAt) < new Date()
    );
    const activeListingsSorted = activeListings.sort(byEndDateDescending);
    // Fetch profile listings
    const profileListingsAmount = document.querySelector(
      "#profile-listings-amount"
    );
    profileListingsAmount.innerHTML = `
            <p class="inter-semiBold text-center mt-3 text-decoration-underline" id="profile-active-listings">${activeListings.length} open listings</p>
            <p class="inter-semiBold text-center mt-3 text-decoration-underline" id="profile-closed-listings">${closedListings.length} closed listings</p>
          `;
    if (`${activeListings.length}` == 1 && `${closedListings.length}` == 1) {
      profileListingsAmount.innerHTML = `
            <p class="inter-semiBold text-center mt-3 text-decoration-underline" id="profile-active-listings">1 open listing</p>
            <p class="inter-semiBold text-center mt-3 text-decoration-underline" id="profile-closed-listings">1 closed listing</p>`;
    }
    if (`${activeListings.length}` > 1 && `${closedListings.length}` == 1) {
      profileListingsAmount.innerHTML = `
            <p class="inter-semiBold text-center mt-3 text-decoration-underline" id="profile-active-listings">${activeListings.length} open listings</p>
            <p class="inter-semiBold text-center mt-3 text-decoration-underline" id="profile-closed-listings">1 closed listing</p>`;
    }
    if (`${activeListings.length}` == 1 && `${closedListings.length}` > 1) {
      profileListingsAmount.innerHTML = `
            <p class="inter-semiBold text-center mt-3 text-decoration-underline" id="profile-active-listings">1 open listing</p>
            <p class="inter-semiBold text-center mt-3 text-decoration-underline" id="profile-closed-listings">${closedListings.length} closed listings</p>`;
    }
    // Generate profile page listings HTML
    for (let i = 0; i < activeListingsSorted.length; i++) {
      if (`${activeListingsSorted[i].media.length}` > 0) {
        profilePageListings.innerHTML += `
                <div class="listing-card mb-3">
                  <div class="d-flex justify-content-center align-items-center">
                    <a
                      href="/pages/listing.html?id=${
                        activeListingsSorted[i].id
                      }"
                      class="listing-img-container rounded-2"
                      ><img
                        src="${activeListingsSorted[i].media[0]}"
                        class="rounded-2"
                        alt="listing image"
                    /></a>
                  </div>
                  <div class="listing-text-container">
                    <a href="/pages/listing.html?id=${
                      activeListingsSorted[i].id
                    }" class="krub-bold listing-title mt-1"
                      >${activeListingsSorted[i].title}</a
                    >
                    <div class="d-flex justify-content-between">
                      <a href="/pages/listing.html?id=${
                        activeListingsSorted[i].id
                      }" class="inter-regular"
                      
                      >Ends at: ${activeListingsSorted[i].endsAt.substring(
                        11,
                        16
                      )}, ${activeListingsSorted[i].endsAt.substring(
          8,
          10
        )}.${activeListingsSorted[i].endsAt.substring(
          5,
          7
        )}.${activeListingsSorted[i].endsAt.substring(2, 4)}
                      </a>
                    </div>
                  </div>
                </div>
              `;
      } else {
        profilePageListings.innerHTML += `
                <div class="listing-card mb-3">
                  <div class="d-flex justify-content-center align-items-center">
                    <a
                      href="/pages/listing.html?id=${
                        activeListingsSorted[i].id
                      }"
                      class="listing-img-container rounded-2"
                      ><img
                        src="/resources/no_image.svg"
                        class="rounded-2"
                        alt="listing image"
                    /></a>
                  </div>
                  <div class="listing-text-container">
                    <a href="/pages/listing.html?id=${
                      activeListingsSorted[i].id
                    }" class="krub-bold listing-title mt-1"
                      >${activeListingsSorted[i].title}</a
                    >
                    <div class="d-flex justify-content-between">
                      <a href="/pages/listing.html?id=${
                        activeListingsSorted[i].id
                      }" class="inter-regular"
                      
                      >Ends at: ${activeListingsSorted[i].endsAt.substring(
                        11,
                        16
                      )}, ${activeListingsSorted[i].endsAt.substring(
          8,
          10
        )}.${activeListingsSorted[i].endsAt.substring(
          5,
          7
        )}.${activeListingsSorted[i].endsAt.substring(2, 4)}
                      </a>
                    </div>
                  </div>
                </div>
              `;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

fetchListing(`${apiBaseUrl}/profiles/${profileUserName}?_listings=true`);
