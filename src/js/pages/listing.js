import { apiBaseUrl, userName } from "/src/js/api.js";
import { listingId } from "/src/js/queryString.js";
import { userToken } from "/src/js/localStorage.js";

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
    if (data.status == "Too Many Requests") {
      listingContainer.innerHTML = `<h4 class="red-color mt-4">Error: too many requests. Please wait a minute before trying again.</h4>`
    }
    const listingBids = data.bids;
    document.title = data.title + " - Scandinavian Auction House";
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
  
    // Get highest user bid
    const userBids = listingBids.find(function(bid) {
      return bid.bidderName == userName;
    });
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
    function displayListingBtns() {
      let displayReportListingBtn;
      let displayEditDeleteListingBtns;
      if (data.seller.name == userName) {
        displayReportListingBtn = "none";
        displayEditDeleteListingBtns = "block";
      } else {
        displayReportListingBtn = "block";
        displayEditDeleteListingBtns = "none";
      }
      return [displayReportListingBtn, displayEditDeleteListingBtns];
    }
    const [displayReportListingBtn, displayEditDeleteListingBtns] = displayListingBtns();

    function checkForImgAndAvatar() {
      let sellerAvatar;
      let listingImg;
      if (`${data.seller.avatar}`) {
        sellerAvatar = `${data.seller.avatar}`;
      } 
      if (`${data.seller.avatar}` === "null" || `${data.seller.avatar}` === "" || `${data.seller.avatar}` === "undefined") {
        sellerAvatar = "/resources/icons/profile_default.svg";
      }
      if (`${data.media.length}` > 0) {
        listingImg = `${data.media[0]}`;
      } else {
        listingImg = "/resources/no_image.svg";
      }
      return [sellerAvatar, listingImg];
    };
    const [sellerAvatar, listingImg] = checkForImgAndAvatar();

    function checkForDesc() {
      let listingDesc;
      if (`${data.description}`) {
        listingDesc = `${data.description}`;
      }
      if (`${data.description}` === "null" || `${data.description}` === "" || `${data.description}` === "undefined") {
        listingDesc = "";
      }
      return [listingDesc];
    };
    const [listingDesc] = checkForDesc();
          listingContainer.innerHTML = `
                <div class="listing d-flex flex-column justify-content-center">
                  <div class="d-flex flex-column d-sm-none">
                    <div class="mb-2 d-flex align-items-center gap-2">
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
                    <div
                      class="d-flex justify-content-between mb-2 gap-2 listing-buttons-mobile"
                    >
                      <button
                        class="button-greyGreen listing-button-mobile listing-button-mobile-small edit-listing-btn header-buttons rounded-2 inter-semiBold"
                        id="edit-listing-btn-mobile"
                        style="display: ${displayEditDeleteListingBtns}"
                      >
                        Edit listing
                      </button>
                      <button
                        class="button-red-border listing-button-mobile listing-button-mobile-small delete-listing-btn header-buttons rounded-2 inter-semiBold"
                        id="delete-listing-btn-mobile"
                        style="display: ${displayEditDeleteListingBtns}"
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
                      style="display: ${displayReportListingBtn}"
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
                  <div class="d-flex flex-column">
                    <a href="/pages/profile.html?user=${data.seller.name}" class="m-auto mt-2"
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
                    class="button-greyGreen listing-button listing-button-medium edit-listing-btn header-buttons rounded-2 inter-semiBold"
                    id="edit-listing-btn-mobile"
                    style="display: ${displayEditDeleteListingBtns}"
                  >
                    Edit listing
                  </button>
                  <button
                    class="button-red-border listing-button listing-button-medium delete-listing-btn header-buttons rounded-2 inter-semiBold"
                    id="delete-listing-btn-desktop"
                    style="display: ${displayEditDeleteListingBtns}"
                  >
                    Delete listing
                  </button>
                  <button
                    class="button-red-border header-buttons rounded-2 inter-semiBold w-100"
                    style="display: ${displayReportListingBtn}"
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

// Fetch listing tags and bids
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
    const bidsContainer = document.querySelector("#bids");
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
  try {
    async function deleteListing() {
      const response = await fetch(`${apiBaseUrl}/listings/${listingId}`, {
        method: "DELETE",
        headers: {
          "Authorization": userToken,
          "Content-Type": "application/json"
        },
      });
      const listingPage = document.querySelector("#listing-page");
      listingPage.innerHTML = "";
      listingPage.innerHTML = `<h2 class="red-color mt-5">Listing deleted</h2>`;
      setTimeout(function () {
        window.location.href = "/index.html";
      }, 3000);
    };
    document.addEventListener("click", function(e){
      const target1 = e.target.closest("#edit-listing-btn-mobile"); // Or any other selector.
      if(target1){
        window.location.href = `/pages/edit_listing.html?id=${listingId}`;
      }
      const target2 = e.target.closest("#edit-listing-btn-desktop"); // Or any other selector.
      if(target2){
        window.location.href = `/pages/edit_listing.html?id=${listingId}`;
      }
      const target3 = e.target.closest("#delete-listing-btn-mobile"); // Or any other selector.
      if(target3){
        deleteListing();
      }
      const target4 = e.target.closest("#delete-listing-btn-desktop"); // Or any other selector.
      if(target4){
        deleteListing();
      }
    });
  } catch (e) {
    console.log(e);
  }
}

setTimeout(function () {
  fetchListingsTags(`${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`);
}, 800);