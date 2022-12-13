import { apiBaseUrl, userName, userToken } from "/src/js/api.js";
import { listingId } from "/src/js/queryString.js";

const editListingBtn = document.getElementsByClassName("edit-listing-btn");

const deleteListingBtn = document.getElementsByClassName("delete-listing-btn");

const editListingFunction = function () {
  window.location.href = "/pages/edit_listing.html";
};

// Fetch listing
const listingContainer = document.querySelector("#listing-container");
const sellerInfoContainer = document.querySelector("#seller-info-container");

async function fetchListing(url) {
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    const listingBids = data.bids;
  
    // Get highest listing bid
    function getHighestBid(bids) {
      let highestBid;
      if (bids) {
        highestBid = `${listingBids[listingBids.length - 1].amount}`;
      } else {
        highestBid = "none";
      }
      return highestBid;
    }
    const highestBid = getHighestBid(`${listingBids}`);
    console.log("Highest listing bid: " + highestBid);
  
    // Get highest user bid
    const userBids = listingBids.find(function(bid) {
      return bid.bidderName == userName;
    });
    console.log(userBids);
    function getHighestUserBid() {
      if (userBids) {
        const highestUserBid = userBids.amount;
        const userBidDisplay = "flex";
        return [highestUserBid, userBidDisplay];
      } else {
        const highestUserBid = "";
        const userBidDisplay = "none";
        return [highestUserBid, userBidDisplay];
      }
    }
    const [highestUserBid, userBidDisplay] = getHighestUserBid();
  
    // Generate listing
    function checkForImgAndAvatar() {
      console.log(`${data.seller.avatar}` + " q-.-p " + `${data.media[0]}`)
      let sellerAvatar;
      let listingImg;
      if (`${data.seller.avatar}`) {
        sellerAvatar = `${data.seller.avatar}`;
        console.log("Avatar detected");
      } 
      if (`${data.seller.avatar}` === "null" || `${data.seller.avatar}` === "" || `${data.seller.avatar}` === "undefined") {
        sellerAvatar = "/resources/icons/profile_default.svg";
        console.log("No avatar detected");
      }
      if (`${data.media.length}` > 0) {
        listingImg = `${data.media[0]}`;
        console.log("Listing image detected");
      } else {
        listingImg = "/resources/no_image.svg";
        console.log("No listing image detected");
      }
      return [sellerAvatar, listingImg];
    };
    const [sellerAvatar, listingImg] = checkForImgAndAvatar();

    function checkForDesc() {
      let listingDesc;
      if (`${data.description}`) {
        listingDesc = `${data.description}`;
      } 
      if (`${data.seller.avatar}` === "null" || `${data.seller.avatar}` === "" || `${data.seller.avatar}` === "undefined") {
        listingDesc = "";
      }
      return [listingDesc];
    };
    const [listingDesc] = checkForDesc();
          listingContainer.innerHTML = `
                <div class="listing d-flex flex-column justify-content-center">
                  <div class="d-flex flex-column d-sm-none">
                    <div class="mb-2">
                      <div>
                        <a href="/pages/profile.html?user=${data.seller.name}"
                          ><img
                            src="${sellerAvatar}"
                            class="bid-pfp rounded-circle"
                            alt="User avatar"
                        /></a>
                        <a
                          href="/pages/profile.html?user=${data.seller.name}"
                          class="text-decoration-none dark-color krub-bold"
                        >
                          ${data.seller.name}
                        </a>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between mb-2 gap-2 listing-buttons-mobile"
                    >
                      <button
                        class="button-greyGreen listing-button-mobile listing-button-mobile-small edit-listing-btn header-buttons rounded-2 inter-semiBold"
                      >
                        Edit listing
                      </button>
                      <button
                        class="button-red-border listing-button-mobile listing-button-mobile-small delete-listing-btn header-buttons rounded-2 inter-semiBold"
                      >
                        Delete listing
                      </button>
                    </div>
                  </div>
                  <div
                    class="listing-image-container d-flex justify-content-center"
                    id="open-listing-img"
                  >
                    <img
                      src="${listingImg}"
                      class="rounded-2"
                      alt="listing image"
                    />
                  </div>
                  <div
                    class="d-none listing-image-container d-flex justify-content-center align-items-center bg-dark rounded-2"
                    id="closed-listing-img"
                  >
                    <h1 class="text-white mb-0 position-absolute">Closed</h1>
                    <img
                      src="${listingImg}"
                      class="rounded-2 opacity-25"
                      alt="listing image"
                    />
                  </div>
                  <div
                    class="d-none listing-image-container rounded-1 d-flex justify-content-center align-items-center"
                    id="no-listing-img"
                  >
                    <img
                      src="${listingImg}"
                      class="rounded-2"
                      alt="listing image"
                    />
                  </div>
                  <div class="listing-text-container m-auto pt-2 p-sm-3 pb-0">
                    <p class="listing-title krub-bold mb-1">
                      ${data.title}
                    </p>
                    <div class="">
                      <p class="inter-regular text-decoration-underline">
                        Bidding ends at: ${data.endsAt.substring(
                          11,
                          16
                        )}, ${data.endsAt.substring(8, 10)}.${data.endsAt.substring(
            5,
            7
          )}.${data.endsAt.substring(0, 4)}
                      </p>
                      <p class="inter-regular" id="listing-desc">
                        ${listingDesc}
                      </p>
                    </div>
                    <div style="display: none" id="listing-tags-container-mobile" class="text-center">
                      <div class="d-flex d-sm-none m-auto background-color-brown rounded-2 p-2 mb-2">
                        <div
                          class="tags-container m-auto"
                        >
                            <p class="inter-medium text-white mb-2">Tags:</p>
                          <div
                            class="listing-tags inter-regular d-flex flex-wrap gap-2 justify-content-center m-auto" id="listing-tags-mobile"
                          >
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      class="d-sm-none mt-1 mb-2 button-red-border header-buttons rounded-2 inter-semiBold w-100"
                    >
                      Report listing
                    </button>
                    <div class="d-flex flex-column d-sm-none mb-3">
                      <div class="d-flex gap-1 justify-content-center mb-2">
                        <p class="inter-semiBold mb-0">Highest bid:</p>
                        <p class="inter-extraBold green-color mb-0">${highestBid}</p>
                      </div>
                      <div class="gap-1 justify-content-center mb-2" style="display: ${userBidDisplay}">
                        <p class="inter-semiBold mb-0">Your bid:</p>
                        <p class="inter-extraBold green-color mb-0" id="user-bid">${
                          highestUserBid
                        }</p>
                      </div>
                      <input
                        type="number"
                        name="place-bid"
                        placeholder="Credit amount"
                        class="form-control form-control-height inter-regular mb-1"
                        id="bid-credit-input-mobile"
                        required
                      />
                      <p
                        class="inter-medium header-buttons mb-2 mt-1 red-color"
                        id="bid-error-3-mobile"
                        style="display: none"
                      >
                        Error, insufficient credit balance
                      </p>
                      <p
                        class="inter-medium header-buttons mb-2 mt-1 red-color"
                        id="bid-error-2-mobile"
                        style="display: none"
                      >
                        Error, invalid number
                      </p>
                      <button
                        class="bidding-button button-blue rounded-2 inter-semiBold w-100 mt-1" id="place-bid-btn-mobile"
                      >
                        Place bid
                      </button>
                      <p
                        class="inter-medium header-buttons mb-2 mt-1 red-color"
                        id="bid-error-1-mobile"
                        style="display: none"
                      >
                        Error, credit amount required
                      </p>
                    </div>
                    <hr class="dark-divider m-auto" />
                    <p
                      class="inter-regular text-center mt-3 text-decoration-underline"
                    >
                      Bids: ${data._count.bids}
                    </p>
                    <div id="bids">
                    </div>
                  </div>
                </div>
          `;
        sellerInfoContainer.innerHTML = `
        <div class="listing-info-container m-auto">
                <div
                  class="seller-container mb-3 background-color-brown rounded-2 p-2"
                >
                  <p
                    class="text-white inter-medium text-decoration-underline text-center"
                  >
                    Seller
                  </p>
                  <div class="d-flex flex-column">
                    <a href="/pages/profile.html?user=${data.seller.name}" class="m-auto"
                      ><img
                        src="${sellerAvatar}"
                        class="seller-pfp rounded-circle"
                        alt="User avatar"
                    /></a>
                    <a
                      href="/pages/profile.html?user=${data.seller.name}"
                      class="text-decoration-none text-white krub-bold mt-1 m-auto"
                    >
                      ${data.seller.name}
                    </a>
                  </div>
                </div>
                <div style="display: none" id="listing-tags-container-desktop" class="text-center">
                      <div class="d-none d-sm-flex m-auto background-color-brown rounded-2 p-2 mb-2">
                        <div
                          class="tags-container m-auto"
                        >
                            <p class="inter-medium text-white mb-2">Tags:</p>
                          <div
                            class="listing-tags inter-regular d-flex flex-wrap gap-2 justify-content-center m-auto" id="listing-tags-desktop"
                          >
                          </div>
                        </div>
                      </div>
                    </div>
                <div class="d-flex justify-content-between listing-buttons mt-2">
                  <button
                    class="d-none button-greyGreen listing-button listing-button-medium edit-listing-btn header-buttons rounded-2 inter-semiBold"
                  >
                    Edit listing
                  </button>
                  <button
                    class="d-none button-red-border listing-button listing-button-medium delete-listing-btn header-buttons rounded-2 inter-semiBold"
                  >
                    Delete listing
                  </button>
                  <button
                    class="button-red-border header-buttons rounded-2 inter-semiBold w-100"
                  >
                    Report listing
                  </button>
                </div>
                <div class="d-flex gap-1 justify-content-center mt-4 mb-2">
                  <p class="inter-semiBold mb-0">Highest bid:</p>
                  <p class="inter-extraBold green-color mb-0">${highestBid}</p>
                </div>
                <div class="gap-1 justify-content-center mb-2" style="display: ${userBidDisplay}">
                      <p class="inter-semiBold mb-0">Your bid:</p>
                      <p class="inter-extraBold green-color mb-0" id="user-bid">${
                        highestUserBid
                      }</p>
                    </div>
                <input
                  type="number"
                  name="place-bid"
                  placeholder="Credit amount"
                  class="form-control form-control-height inter-regular mb-1"
                  id="bid-credit-input-desktop"
                  required
                />
                <p
                  class="inter-medium header-buttons mb-2 mt-1 red-color"
                  id="bid-error-3-desktop"
                  style="display: none"
                >
                  Error, insufficient credit balance
                </p>
                <p
                  class="inter-medium header-buttons mb-2 mt-1 red-color"
                  id="bid-error-2-desktop"
                  style="display: none"
                >
                  Error, invalid number
                </p>
                <button
                  class="bidding-button button-blue rounded-2 inter-semiBold w-100 mt-1" id="place-bid-btn-desktop"
                >
                  Place bid
                </button>
                <p
                  class="inter-medium header-buttons mb-2 mt-1 red-color"
                  id="bid-error-1-desktop"
                  style="display: none"
                >
                  Error, credit amount required
                </p>
              </div>
        `;
  } catch (e) {
    console.log(e);
  }
}

fetchListing(`${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`);

// Fetch listing tags
async function fetchListingsTags(url) {
  const listingTagsDesktop = document.querySelector("#listing-tags-desktop");
  const listingTagsMobile = document.querySelector("#listing-tags-mobile");
  const listingTagsContainerDesktop = document.querySelector("#listing-tags-container-desktop");
  const listingTagsContainerMobile = document.querySelector("#listing-tags-container-mobile");
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    for (let i = 0; i < data.tags.length; i++) {
      console.log(data.tags[i]);
      if (data.tags.length < 0 || data.tags[i] === "") {
        listingTagsContainerMobile.style.display = "none";
        listingTagsContainerDesktop.style.display = "none";
      } else {
        listingTagsContainerMobile.style.display = "block";
        listingTagsContainerDesktop.style.display = "block";
      }
      listingTagsDesktop.innerHTML += `
        <a href="#" class="listing-tag">${data.tags[i]}</a>
      `;
      listingTagsMobile.innerHTML += `
      <a href="#" class="listing-tag">${data.tags[i]}</a>
    `;
    }
  } catch (e) {
    console.log(e);
  }
}

setTimeout(function () {
  fetchListingsTags(`${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`);
}, 600);

// Fetch listing bids
async function fetchListingBids(url) {
  try {
    const bidsContainer = document.querySelector("#bids");
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const listingBids = data.bids;
    for (let i = listingBids.length - 1; i >= 0; i--) {
        bidsContainer.innerHTML += `
        <div class="bid d-flex flex-column m-auto rounded-2 p-2 mb-2 justify-content-between">
          <div class=" pb-0 d-flex justify-content-center gap-2">
            <a
              href="/pages/profile.html?user=${
                listingBids[i].bidderName
              }"
              class="mt-auto mb-auto text-decoration-none text-white krub-semiBold"
            >
              ${listingBids[i].bidderName}
            </a>
          </div>
          <p class="bid-amount text-white text-center mb-0">
            ${listingBids[i].amount} credits
          </p>
        </div>
        `
    }
  } catch (e) {
    console.log(e);
  }
}

setTimeout(function () {
  fetchListingBids(`${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`);
}, 600);

// Edit listing button
for (let i = 0; i < editListingBtn.length; i++) {
  editListingBtn[i].addEventListener("click", editListingFunction);
}

// Delete listing button
const deleteListing = function () {
  console.log("This function will later delete the listing");
};
for (let i = 0; i < deleteListingBtn.length; i++) {
  deleteListingBtn[i].addEventListener("click", deleteListing);
}