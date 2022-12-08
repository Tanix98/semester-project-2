import { apiBaseUrl, userName, userToken } from "/src/js/api.js";
import { listingId } from "/src/js/queryString.js";

const editListingBtn = document.getElementsByClassName("edit-listing-btn");

const deleteListingBtn = document.getElementsByClassName("delete-listing-btn");

const editListingFunction = function () {
  window.location.href = "/pages/edit_listing.html";
};

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

// Fetch listing
const listingContainer = document.querySelector("#listing-container");
const sellerInfoContainer = document.querySelector("#seller-info-container");

async function fetchListing(url) {
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  function getHighestBid(bids) {
    let highestBid;
    if (bids) {
      highestBid = `${data.bids[data.bids.length - 1].amount}`;
    } else {
      highestBid = "none";
    }
    return highestBid;
  }
  const highestBid = getHighestBid(`${data.bids}`);
  console.log(highestBid);
  function getHighestUserBid() {
    for (let i = 0; i < data.bids.length; i++) {
      //const userBidAmount = document.querySelector("#user-bid");
      if (data.bids[i].bidderName == userName) {
        const allUserBids = data.bids[i];
        /*if (allUserBids.length > 1) {
          console.log("dsds");
        }*/
        console.log(allUserBids);
        console.log(Object.entries(allUserBids));
        const highestUserBid = Math.max(allUserBids);
        const userBidDisplay = "flex";
        /*userBidAmount.innerHTML = "highestUserBid";
        userBidAmount.style.display = "flex";*/
        return [highestUserBid, userBidDisplay];
      } else {
        const highestUserBid = "";
        const userBidDisplay = "none";
        //userBidAmount.style.display = "none";
        return [highestUserBid, userBidDisplay];
      }
    }
  }
  const [highestUserBid, userBidDisplay] = getHighestUserBid();
  console.log(
    "highestUserBid: " + highestUserBid,
    "userBidDisplay: " + userBidDisplay
  );
  for (let i = 0; i < data.media.length; i++) {
    try {
      listingContainer.innerHTML = `
      <div class="listing d-flex flex-column justify-content-center">
              <div class="d-flex flex-column d-sm-none">
                <div class="mb-2">
                  <div>
                    <a href="/pages/profile.html?user=${data.seller.name}"
                      ><img
                        src="/resources/icons/profile_default.svg"
                        class="bid-pfp rounded-circle"
                        alt="Default user avatar"
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
                  src="${data.media[0]}"
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
                  src="${data.media[0]}"
                  class="rounded-2 opacity-25"
                  alt="listing image"
                />
              </div>
              <div
                class="d-none listing-image-container rounded-1 d-flex justify-content-center align-items-center"
                id="no-listing-img"
              >
                <img
                  src="/resources/no_image.svg"
                  class="rounded-2"
                  alt="listing image"
                />
              </div>
              <div class="listing-text-container m-auto p-3 pb-0">
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
                  <p class="listing-desc inter-regular">
                    ${data.description}
                  </p>
                </div>
                <div
                  class="d-flex d-sm-none tags-container background-color-brown rounded-2 p-2 m-auto mb-2"
                >
                  <div class="d-none text-center">
                    <p class="inter-medium text-white mb-2">Tags:</p>
                  </div>
                  <div
                    class="listing-tags inter-regular d-flex flex-wrap gap-1 justify-content-center m-auto"
                  >
                    <a href="#" class="listing-tag">${data.tags[i]}</a>
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
                  <div class="gap-1 justify-content-center mb-2" style="display: none">
                    <p class="inter-semiBold mb-0">Your bid:</p>
                    <p class="inter-extraBold green-color mb-0" id="user-bid">${
                      data.bids[0].bidderName
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
                    class="d-none inter-medium header-buttons mb-2 mt-1 red-color"
                    id="bid-error-2-mobile"
                  >
                    Error, insufficient credit balance
                  </p>
                  <p
                    class="d-none inter-medium header-buttons mb-2 mt-1 red-color"
                    id="bid-error-3-mobile"
                  >
                    Error, invalid number
                  </p>
                  <button
                    class="bidding-button button-blue rounded-2 inter-semiBold w-100 mt-1" id="place-bid-btn-mobile"
                  >
                    Place bid
                  </button>
                  <p
                    class="d-none inter-medium header-buttons mb-2 mt-1 red-color"
                    id="bid-error-1-mobile"
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
                <div class="bids">
                  <div class="bid m-auto rounded-2">
                    <div class="p-2 pb-0 d-flex justify-content-center gap-2">
                      <a
                        href="/pages/profile.html?user=${
                          data.bids[i].bidderName
                        }"
                        class="mt-auto mb-auto text-decoration-none text-white inter-medium"
                      >
                        ${data.bids[i].bidderName}
                      </a>
                    </div>
                    <p class="bid-amount text-white text-center p-2">
                      ${data.bids[i].amount} credits
                    </p>
                  </div>
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
                      src="/resources/icons/profile_default.svg"
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
              <div
                class="tags-container background-color-brown rounded-2 p-2 m-auto"
              >
                <div class="text-center">
                  <p class="inter-medium text-white mb-2">Tags:</p>
                </div>
                <div
                  class="listing-tags inter-regular d-flex flex-wrap gap-1 justify-content-center m-auto"
                >
                  <a href="#" class="listing-tag">${data.tags[i]}</a>
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
              <input
                type="number"
                name="place-bid"
                placeholder="Credit amount"
                class="form-control form-control-height inter-regular mb-1"
                id="bid-credit-input-desktop"
                required
              />
              <p
                class="d-none inter-medium header-buttons mb-2 mt-1 red-color"
                id="bid-error-2"
              >
                Error, insufficient credit balance
              </p>
              <p
                class="d-none inter-medium header-buttons mb-2 mt-1 red-color"
                id="bid-error-3"
              >
                Error, invalid number
              </p>
              <button
                class="bidding-button button-blue rounded-2 inter-semiBold w-100 mt-1" id="place-bid-btn-desktop"
              >
                Place bid
              </button>
              <p
                class="d-none inter-medium header-buttons mb-2 mt-1 red-color"
                id="bid-error-1"
              >
                Error, credit amount required
              </p>
            </div>
      `;
    } catch (e) {
      console.log(e);
    }
  }
}

fetchListing(`${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`);

// Place bids button, needs to check if listing has loaded before running
const placeBidButtonDesktop = document.querySelector("#place-bid-btn-desktop");
const placeBidButtonMobile = document.querySelector("#place-bid-btn-mobile");
const bidCreditAmountDesktop = document.querySelector(
  "#bid-credit-input-desktop"
);
const bidCreditAmountMobile = document.querySelector(
  "#bid-credit-input-mobile"
);

async function placeListingBid(url, body) {
  const response = await fetch(`${url}`, {
    method: "POST",
    body: `${body}`,
    headers: {
      Authorization: userToken,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
}

placeBidButtonDesktop.addEventListener("click", () => {
  const sendBody = {
    amount: bidCreditAmountDesktop.value,
  };
  placeListingBid(`${apiBaseUrl}/listings/${listingId}/bids`, sendBody);
});

placeBidButtonMobile.addEventListener("click", () => {
  const sendBody = {
    amount: bidCreditAmountMobile.value,
  };
  placeListingBid(`${apiBaseUrl}/listings/${listingId}/bids`, sendBody);
});
