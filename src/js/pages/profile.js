import { apiBaseUrl, userToken } from "/src/js/api.js";
import { profileUserName } from "/src/js/queryString.js";

document.title = profileUserName + "'s profile - Scandinavian Auction House";

const profilePageInfo = document.querySelector("#profile-page-info");
const profilePageListings = document.querySelector("#profile-page-listings");

async function fetchListing(url) {
    try {
        const response = await fetch(`${url}`, {
            method: "GET",
            headers: {
              Authorization: "bearer " + userToken,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log(data);
          // Fetch profile
          function getProfileAvatar() {
            let profileAvatar;
            if (`${data.avatar}`) {
              profileAvatar = `${data.avatar}`;
            } 
            if (`${data.avatar}` == "null"|| `${data.avatar}` === "" || `${data.avatar}` === "undefined") {
              profileAvatar = "/resources/icons/profile_default.svg";
            }
            return [profileAvatar];
          };
          const [profileAvatar] = getProfileAvatar();
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
                    class="d-none col-sm-4 col-md-3 col-xl-2 profile-button button-red-border header-buttons rounded-2 inter-semiBold m-auto"
                    id="report-user-button"
                    >
                    Report user
                    </button>
                    <button
                    class="button-dark-border profile-button col-sm-4 col-md-3 col-xl-2 header-buttons rounded-2 inter-semiBold m-auto"
                    id="edit-pfp-button"
                    >
                    Edit profile picture
                    </button>
                </div>
          `;

          // Fetch profile listings
          const profileListingsAmount = document.querySelector("#profile-listings-amount");
          if (`${data.listings.length}` > 1) {
            profileListingsAmount.innerHTML = `${data.listings.length} listings`;
          } 
          if (`${data.listings.length}` === 1) {
            profileListingsAmount.innerHTML = "1 listing";
          }
          
          for (let i = 0; i < data.listings.length; i++) {
            if (`${data.listings[i].media.length}` > 0) {
              profilePageListings.innerHTML += `
                <div class="listing-card mb-3">
                  <div class="d-flex justify-content-center align-items-center">
                    <a
                      href="/pages/listing.html?id=${data.listings[i].id}"
                      class="listing-img-container rounded-2"
                      ><img
                        src="${data.listings[i].media[0]}"
                        class="rounded-2"
                        alt="listing image"
                    /></a>
                  </div>
                  <div class="listing-text-container">
                    <a href="/pages/listing.html?id=${data.listings[i].id}" class="krub-bold listing-title mt-1"
                      >${data.listings[i].title}</a
                    >
                    <div class="d-flex justify-content-between">
                      <a href="/pages/listing.html?id=${data.listings[i].id}" class="inter-regular"
                      
                      >Ends at: ${data.listings[i].endsAt.substring(
                        11,
                        16
                        )}, ${data.listings[i].endsAt.substring(
                        8,
                        10
                        )}.${data.listings[i].endsAt.substring(5, 7)}.${data.listings[i].endsAt.substring(
                        2,
                        4
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              `;
              console.log("Img detected");
            } 
            else {
              profilePageListings.innerHTML += `
                <div class="listing-card mb-3">
                  <div class="d-flex justify-content-center align-items-center">
                    <a
                      href="/pages/listing.html?id=${data.listings[i].id}"
                      class="listing-img-container rounded-2"
                      ><img
                        src="/resources/no_image.svg"
                        class="rounded-2"
                        alt="listing image"
                    /></a>
                  </div>
                  <div class="listing-text-container">
                    <a href="/pages/listing.html?id=${data.listings[i].id}" class="krub-bold listing-title mt-1"
                      >${data.listings[i].title}</a
                    >
                    <div class="d-flex justify-content-between">
                      <a href="/pages/listing.html?id=${data.listings[i].id}" class="inter-regular"
                      
                      >Ends at: ${data.listings[i].endsAt.substring(
                        11,
                        16
                        )}, ${data.listings[i].endsAt.substring(
                        8,
                        10
                        )}.${data.listings[i].endsAt.substring(5, 7)}.${data.listings[i].endsAt.substring(
                        2,
                        4
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              `;
              console.log("Img not detected");
            }
          }
    } catch (e) {
        console.log(e);
    }
}

fetchListing(`${apiBaseUrl}/profiles/${profileUserName}?_listings=true`);