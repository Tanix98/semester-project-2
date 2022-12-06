/* eslint-disable-line */

import { apiBaseUrl } from "/src/js/api.js";
import {
  byDateCreatedDescending,
  byDateCreatedAscending,
  byEndDateDescending,
  byEndDateAscending,
} from "/src/js/components/sort-listings.js";

const listingsContainer = document.querySelector("#listings");

const currentDate = new Date();

console.log(currentDate);

/**
 * Description of function
 */
async function fetchListingsbyDateCreatedDescending(url) {
  listingsContainer.innerHTML = "";
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRaw = await response.json();
    const data = dataRaw.sort(byDateCreatedDescending);
    for (let i = 0; i < data.length; i++) {
      try {
        if (`${data[i].media.length}` > 0) {
          listingsContainer.innerHTML += `
                        <div class="listing-card mb-3">
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <a
                                    href="/pages/listing.html?id=${data[i].id}"
                                    class="listing-img-container rounded-2"
                                    ><img
                                        src="${data[i].media[0]}"
                                        class="rounded-2"
                                        alt="listing image"
                                /></a>
                            </div>
                            <div>
                                <a href="/pages/listing.htmlid=${
                                  data[i].id
                                }" class="krub-bold"
                                    >${data[i].title}</a
                                >
                                <div class="d-flex justify-content-between">
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular" title="${data[
            i
          ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(8, 10)}.${data[
            i
          ].endsAt.substring(5, 7)}.${data[i].endsAt.substring(0, 4)}"
                                        >Ends at: ${data[i].endsAt.substring(
                                          11,
                                          16
                                        )}, ${data[i].endsAt.substring(
            8,
            10
          )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
            2,
            4
          )}</a
                                    >
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular"
                                        >Bids: ${data[i]._count.bids}</a
                                    >
                                </div>
                            </div>
                        </div>
                    `;
        } else {
          listingsContainer.innerHTML += `<div class="listing-card mb-3">
                            <div class="d-flex justify-content-center align-items-center"
                            >
                                <a
                                    href="/pages/listing.html?id=${data[i].id}"
                                    class="listing-img-container rounded-2"
                                    ><img
                                        src="/resources/no_image.svg"
                                        class="rounded-2"
                                        alt="listing image"
                                /></a>
                            </div>
                            <div>
                                <a href="/pages/listing.htmlid=${
                                  data[i].id
                                }" class="krub-bold"
                                    >${data[i].title}</a
                                >
                                <div class="d-flex justify-content-between">
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular" title="${data[
            i
          ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(8, 10)}.${data[
            i
          ].endsAt.substring(5, 7)}.${data[i].endsAt.substring(0, 4)}"
                                        >Ends at: ${data[i].endsAt.substring(
                                          11,
                                          16
                                        )}, ${data[i].endsAt.substring(
            8,
            10
          )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
            2,
            4
          )}</a
                                    >
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular"
                                        >Bids: ${data[i]._count.bids}</a
                                    >
                                </div>
                            </div>
                        </div>
                    `;
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

try {
  fetchListingsbyDateCreatedDescending(`${apiBaseUrl}/listings`);
} catch (e) {
  console.log(e);
}

// Other fetch listing functions sorted differently

async function fetchListingsbydateCreatedAscending(url) {
  listingsContainer.innerHTML = "";
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRaw = await response.json();
    const data = dataRaw.sort(byDateCreatedAscending);
    for (let i = 0; i < data.length; i++) {
      try {
        if (`${data[i].media.length}` > 0) {
          listingsContainer.innerHTML += `
                        <div class="listing-card mb-3">
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <a
                                    href="/pages/listing.html?id=${data[i].id}"
                                    class="listing-img-container rounded-2"
                                    ><img
                                        src="${data[i].media[0]}"
                                        class="rounded-2"
                                        alt="listing image"
                                /></a>
                            </div>
                            <div>
                                <a href="/pages/listing.htmlid=${
                                  data[i].id
                                }" class="krub-bold"
                                    >${data[i].title}</a
                                >
                                <div class="d-flex justify-content-between">
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular" title="${data[
            i
          ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(8, 10)}.${data[
            i
          ].endsAt.substring(5, 7)}.${data[i].endsAt.substring(0, 4)}"
                                        >Ends at: ${data[i].endsAt.substring(
                                          11,
                                          16
                                        )}, ${data[i].endsAt.substring(
            8,
            10
          )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
            2,
            4
          )}</a
                                    >
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular"
                                        >Bids: ${data[i]._count.bids}</a
                                    >
                                </div>
                            </div>
                        </div>
                    `;
        } else {
          listingsContainer.innerHTML += `
                        <div class="listing-card mb-3">
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <a
                                    href="/pages/listing.html?id=${data[i].id}"
                                    class="listing-img-container rounded-2"
                                    ><img
                                        src="/resources/no_image.svg"
                                        class="rounded-2"
                                        alt="listing image"
                                /></a>
                            </div>
                            <div>
                                <a href="/pages/listing.htmlid=${
                                  data[i].id
                                }" class="krub-bold"
                                    >${data[i].title}</a
                                >
                                <div class="d-flex justify-content-between">
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular" title="${data[
            i
          ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(8, 10)}.${data[
            i
          ].endsAt.substring(5, 7)}.${data[i].endsAt.substring(0, 4)}"
                                        >Ends at: ${data[i].endsAt.substring(
                                          11,
                                          16
                                        )}, ${data[i].endsAt.substring(
            8,
            10
          )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
            2,
            4
          )}</a
                                    >
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular"
                                        >Bids: ${data[i]._count.bids}</a
                                    >
                                </div>
                            </div>
                        </div>
                    `;
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

async function fetchListingsbyendDateDescending(url) {
  listingsContainer.innerHTML = "";
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRaw = await response.json();
    const data = dataRaw.sort(byEndDateDescending);
    for (let i = 0; i < data.length; i++) {
      try {
        if (`${data[i].media.length}` > 0) {
          listingsContainer.innerHTML += `
                        <div class="listing-card mb-3">
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <a
                                    href="/pages/listing.html?id=${data[i].id}"
                                    class="listing-img-container rounded-2"
                                    ><img
                                        src="${data[i].media[0]}"
                                        class="rounded-2"
                                        alt="listing image"
                                /></a>
                            </div>
                            <div>
                                <a href="/pages/listing.htmlid=${
                                  data[i].id
                                }" class="krub-bold"
                                    >${data[i].title}</a
                                >
                                <div class="d-flex justify-content-between">
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular" title="${data[
            i
          ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(8, 10)}.${data[
            i
          ].endsAt.substring(5, 7)}.${data[i].endsAt.substring(0, 4)}"
                                        >Ends at: ${data[i].endsAt.substring(
                                          11,
                                          16
                                        )}, ${data[i].endsAt.substring(
            8,
            10
          )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
            2,
            4
          )}</a
                                    >
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular"
                                        >Bids: ${data[i]._count.bids}</a
                                    >
                                </div>
                            </div>
                        </div>
                    `;
        } else {
          listingsContainer.innerHTML += `
                        <div class="listing-card mb-3">
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <a
                                    href="/pages/listing.html?id=${data[i].id}"
                                    class="listing-img-container rounded-2"
                                    ><img
                                        src="/resources/no_image.svg"
                                        class="rounded-2"
                                        alt="listing image"
                                /></a>
                            </div>
                            <div>
                                <a href="/pages/listing.htmlid=${
                                  data[i].id
                                }" class="krub-bold"
                                    >${data[i].title}</a
                                >
                                <div class="d-flex justify-content-between">
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular" title="${data[
            i
          ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(8, 10)}.${data[
            i
          ].endsAt.substring(5, 7)}.${data[i].endsAt.substring(0, 4)}"
                                        >Ends at: ${data[i].endsAt.substring(
                                          11,
                                          16
                                        )}, ${data[i].endsAt.substring(
            8,
            10
          )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
            2,
            4
          )}</a
                                    >
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular"
                                        >Bids: ${data[i]._count.bids}</a
                                    >
                                </div>
                            </div>
                        </div>
                    `;
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

async function fetchListingsbyendDateAscending(url) {
  listingsContainer.innerHTML = "";
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRaw = await response.json();
    const data = dataRaw.sort(byEndDateAscending);
    for (let i = 0; i < data.length; i++) {
      try {
        if (`${data[i].media.length}` > 0) {
          listingsContainer.innerHTML += `
                        <div class="listing-card mb-3">
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <a
                                    href="/pages/listing.html?id=${data[i].id}"
                                    class="listing-img-container rounded-2"
                                    ><img
                                        src="${data[i].media[0]}"
                                        class="rounded-2"
                                        alt="listing image"
                                /></a>
                            </div>
                            <div>
                                <a href="/pages/listing.htmlid=${
                                  data[i].id
                                }" class="krub-bold"
                                    >${data[i].title}</a
                                >
                                <div class="d-flex justify-content-between">
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular" title="${data[
            i
          ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(8, 10)}.${data[
            i
          ].endsAt.substring(5, 7)}.${data[i].endsAt.substring(0, 4)}"
                                        >Ends at: ${data[i].endsAt.substring(
                                          11,
                                          16
                                        )}, ${data[i].endsAt.substring(
            8,
            10
          )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
            2,
            4
          )}</a
                                    >
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular"
                                        >Bids: ${data[i]._count.bids}</a
                                    >
                                </div>
                            </div>
                        </div>
                    `;
        } else {
          listingsContainer.innerHTML += `
                        <div class="listing-card mb-3">
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <a
                                    href="/pages/listing.html?id=${data[i].id}"
                                    class="listing-img-container rounded-2"
                                    ><img
                                        src="/resources/no_image.svg"
                                        class="rounded-2"
                                        alt="listing image"
                                /></a>
                            </div>
                            <div>
                                <a href="/pages/listing.htmlid=${
                                  data[i].id
                                }" class="krub-bold"
                                    >${data[i].title}</a
                                >
                                <div class="d-flex justify-content-between">
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular" title="${data[
            i
          ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(8, 10)}.${data[
            i
          ].endsAt.substring(5, 7)}.${data[i].endsAt.substring(0, 4)}"
                                        >Ends at: ${data[i].endsAt.substring(
                                          11,
                                          16
                                        )}, ${data[i].endsAt.substring(
            8,
            10
          )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
            2,
            4
          )}</a
                                    >
                                    <a href="/pages/listing.html?id=${
                                      data[i].id
                                    }" class="inter-regular"
                                        >Bids: ${data[i]._count.bids}</a
                                    >
                                </div>
                            </div>
                        </div>
                    `;
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

// Sort by dropdown menu buttons
const dateCreatedDescendingBtn = document.querySelector(
  "#date-created-descending"
);
const dateCreatedAscendingBtn = document.querySelector(
  "#date-created-ascending"
);
const endDateDescendingBtn = document.querySelector("#end-date-descending");
const endDateAscendingBtn = document.querySelector("#end-date-ascending");

dateCreatedDescendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbyDateCreatedDescending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});

dateCreatedAscendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbydateCreatedAscending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});

endDateDescendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbyendDateDescending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});

endDateAscendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbyendDateAscending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});

endDateDescendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbyendDateDescending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});

endDateAscendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbyendDateAscending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});

endDateDescendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbyendDateDescending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});

endDateAscendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbyendDateAscending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});

endDateDescendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbyendDateDescending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});

endDateAscendingBtn.addEventListener("click", () => {
  try {
    fetchListingsbyendDateAscending(`${apiBaseUrl}/listings`);
  } catch (e) {
    console.log(e);
  }
});
