import { apiBaseUrl, userName } from "/src/js/api.js";
import { listingId } from "/src/js/queryString.js";
import { userToken } from "/src/js/localStorage.js";
import { loadingWheel } from "/src/js/variables.js";

const editListingFunction = function () {
  window.location.href = "/pages/edit_listing.html";
};

// Fetch listing
const listingContainer = document.querySelector("#listing-container");
const sellerInfoContainer = document.querySelector("#seller-info-container");

let currentImageNumber = 1;

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
    document.title = data.title + " - Scandinavian Auction House";
    if (data.status == "Too Many Requests" || data.statusCode == 429) {
      loadingWheel.classList.add("d-none");
      listingContainer.innerHTML = `<h4 class="red-color mt-4">Error: ${data.status}. Please wait a minute before trying again.</h4>`;
    }
    if (data.statusCode == 400) {
      loadingWheel.classList.add("d-none");
      listingContainer.innerHTML = `<h2 class="red-color mt-4">This listing does not exist</h2>`;
    }

    // Get highest listing bid
    const listingBids = data.bids;
    listingBids.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    function getHighestBid(bids) {
      let highestBid;
      if (bids) {
        highestBid = `${listingBids[0].amount}`;
      } else {
        highestBid = "none";
      }
      return highestBid;
    }
    const highestBid = getHighestBid(`${listingBids}`);

    // Get highest user bid
    console.log(listingBids);
    const userBids = listingBids.find(function (bid) {
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
    const [displayReportListingBtn, displayEditDeleteListingBtns] =
      displayListingBtns();

    function checkForImgAndAvatar() {
      let sellerAvatar;
      let listingImg;
      if (`${data.seller.avatar}`) {
        sellerAvatar = `${data.seller.avatar}`;
      }
      if (
        `${data.seller.avatar}` === "null" ||
        `${data.seller.avatar}` === "" ||
        `${data.seller.avatar}` === "undefined"
      ) {
        sellerAvatar = "/resources/icons/profile_default.svg";
      }
      if (`${data.media.length}` > 0) {
        listingImg = `${data.media[0]}`;
      } else {
        listingImg = "/resources/no_image.svg";
      }
      return [sellerAvatar, listingImg];
    }
    const [sellerAvatar, listingImg] = checkForImgAndAvatar();

    function checkForDesc() {
      let listingDesc;
      if (`${data.description}`) {
        listingDesc = `${data.description}`;
      }
      if (
        `${data.description}` === "null" ||
        `${data.description}` === "" ||
        `${data.description}` === "undefined"
      ) {
        listingDesc = "";
      }
      return [listingDesc];
    }
    const [listingDesc] = checkForDesc();
    loadingWheel.classList.add("d-none");
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
                  >
                    <img
                      src="${listingImg}"
                      class="rounded-2"
                      alt="listing image"
                    />
                  </div>
                  <div class="d-none align-items-center gap-2 m-auto mt-2" id="img-gallery-navigation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" id="img-arrow-left">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                    <p class="inter-medium mb-0" id="image-count">1 / X</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16" id="img-arrow-right">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                  </div>
                  <div class="listing-text-container m-auto pt-2 p-sm-3 pb-0">
                    <p class="listing-title krub-bold mb-1">
                      ${data.title}
                    </p>
                    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                      <p class="inter-medium text-decoration-underline mb-0 pe-3">
                        Bidding ends at: ${data.endsAt.substring(
                          11,
                          16
                        )}, ${data.endsAt.substring(
      8,
      10
    )}.${data.endsAt.substring(5, 7)}.${data.endsAt.substring(0, 4)}
                      </p>
                      <p class="inter-regular text-decoration-underline mb-0" id="listing-created">
                        Created: ${data.created.substring(
                          11,
                          16
                        )}, ${data.created.substring(
      8,
      10
    )}.${data.created.substring(5, 7)}.${data.created.substring(0, 4)}
                      </p>
                    </div>
                    <p class="inter-regular" id="listing-desc">
                        ${listingDesc}
                    </p>
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
                        <p class="inter-extraBold green-color mb-0" id="user-bid">${highestUserBid}</p>
                      </div>
                      <input
                        type="number"
                        min="0"
                        name="place-bid"
                        placeholder="Credit amount"
                        class="form-control form-control-height inter-regular mb-1"
                        id="bid-credit-input-mobile"
                        required
                      />
                      <button
                        class="bidding-button button-blue rounded-2 inter-semiBold w-100 mt-1" id="place-bid-btn-mobile"
                      >
                        Place bid
                      </button>
                      <p class="inter-medium mb-2 mt-1 text-center" id="place-bid-message-mobile" style="display: none"></p>
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
                      <p class="inter-extraBold green-color mb-0" id="user-bid">${highestUserBid}</p>
                    </div>
                <input
                  type="number"
                  min="0"
                  name="place-bid"
                  placeholder="Credit amount"
                  class="form-control form-control-height inter-regular mb-1"
                  id="bid-credit-input-desktop"
                  required
                />
                <button
                  class="bidding-button button-blue rounded-2 inter-semiBold w-100 mt-1" id="place-bid-btn-desktop"
                >
                  Place bid
                </button>
                <p class="inter-medium mb-2 mt-1 text-center" id="place-bid-message-desktop" style="display: none"></p>
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
  const listingTagsContainerDesktop = document.querySelector(
    "#listing-tags-container-desktop"
  );
  const listingTagsContainerMobile = document.querySelector(
    "#listing-tags-container-mobile"
  );
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
        <a href="/index.html?tag=${data.tags[i]}" class="listing-tag">${data.tags[i]}</a>
      `;
      listingTagsMobile.innerHTML += `
      <a href="/index.html?tag=${data.tags[i]}" class="listing-tag">${data.tags[i]}</a>
    `;
    }
    const bidsContainer = document.querySelector("#bids");
    const listingBids = data.bids;
    listingBids.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    console.log(listingBids);
    for (let i = 0; i < listingBids.length; i++) {
      bidsContainer.innerHTML += `
        <div class="bid d-flex flex-column m-auto rounded-2 p-2 mb-2 justify-content-between">
          <div class=" pb-0 d-flex justify-content-center gap-2">
            <a
              href="/pages/profile.html?user=${listingBids[i].bidderName}"
              class="mt-auto mb-auto text-decoration-none text-white krub-semiBold"
            >
              ${listingBids[i].bidderName}
            </a>
          </div>
          <p class="bid-amount text-white text-center mb-0">
            ${listingBids[i].amount} credits
          </p>
        </div>
        `;
    }
  } catch (e) {
    console.log(e);
  }
  try {
    async function deleteListing() {
      const response = await fetch(`${apiBaseUrl}/listings/${listingId}`, {
        method: "DELETE",
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      });
      const listingPage = document.querySelector("#listing-page");
      listingPage.innerHTML = "";
      listingPage.innerHTML = `<h2 class="red-color mt-5">Listing deleted</h2>`;
      setTimeout(function () {
        window.location.href = `/pages/profile.html?user=${userName}`;
      }, 3000);
    }
    document.addEventListener("click", function (e) {
      const target1 = e.target.closest("#edit-listing-btn-mobile");
      if (target1) {
        window.location.href = `/pages/edit_listing.html?id=${listingId}`;
      }
      const target2 = e.target.closest("#edit-listing-btn-desktop");
      if (target2) {
        window.location.href = `/pages/edit_listing.html?id=${listingId}`;
      }
      const target3 = e.target.closest("#delete-listing-btn-mobile");
      if (target3) {
        deleteListing();
      }
      const target4 = e.target.closest("#delete-listing-btn-desktop");
      if (target4) {
        deleteListing();
      }
    });
  } catch (e) {
    console.log(e);
  }
}

setTimeout(function () {
  fetchListingsTags(
    `${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`
  );
}, 800);

// Image gallery carousel

async function imgGalleryWait(event) {
  const listingImagesContainer = document.querySelector(
    ".listing-image-container"
  );
  const imageCount = document.querySelector("#image-count");
  const imgGalleryNavigation = document.querySelector(
    "#img-gallery-navigation"
  );
  try {
    const response = await fetch(
      `${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.media.length > 1) {
      imgGalleryNavigation.classList.remove("d-none");
      imgGalleryNavigation.classList.add("d-flex");
    }
    /*if (event.type === "click") {
      if ((event.target.id = "img-arrow-left")) {
        currentImageNumber--;
      }
      if ((event.target.id = "img-arrow-right")) {
        currentImageNumber++;
      }
    }*/
    if (data.media) {
      for (let i = 0; i < data.media.length; i++) {
        imageCount.innerHTML = `${currentImageNumber} / ${data.media.length}`;
        listingImagesContainer.innerHTML = `<img
            src="${data.media[0]}"
            class="rounded-2"
            alt="listing image"
        />`;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return currentImageNumber;
}

setTimeout(function () {
  imgGalleryWait();
}, 800);

async function imgGalleryButtonClick() {
  try {
    const listingImagesContainer = document.querySelector(
      ".listing-image-container"
    );
    const imageCount = document.querySelector("#image-count");
    const response = await fetch(
      `${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const imgNavigation = window.localStorage.getItem("imgNavigation");
    const add = function (valueToAdd) {
      currentImageNumber += valueToAdd;
      return currentImageNumber;
    };
    if (imgNavigation == "previous-img" && currentImageNumber > 1) {
      add(-1);
    }
    if (imgNavigation == "next-img" && currentImageNumber < data.media.length) {
      add(1);
    }
    console.log(currentImageNumber);
    imageCount.innerHTML = `${currentImageNumber} / ${data.media.length}`;
    listingImagesContainer.innerHTML = `<img
      src="${data.media[currentImageNumber - 1]}"
      class="rounded-2"
      alt="listing image"
    />`;
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener("click", function (e) {
  const target1 = e.target.closest("#img-arrow-left");
  if (target1) {
    window.localStorage.removeItem("imgNavigation");
    window.localStorage.setItem("imgNavigation", "previous-img");
    imgGalleryButtonClick(
      `${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`
    );
  }
  const target2 = e.target.closest("#img-arrow-right");
  if (target2) {
    window.localStorage.removeItem("imgNavigation");
    window.localStorage.setItem("imgNavigation", "next-img");
    imgGalleryButtonClick(
      `${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`
    );
  }
});
