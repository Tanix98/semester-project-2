/* eslint-disable-line */

export { listingsContainer };

import { apiBaseUrl } from "/src/js/api.js";
import {
  byDateCreatedDescending,
  byDateCreatedAscending,
  byEndDateDescending,
  byEndDateAscending,
} from "/src/js/components/sort-listings.js";
import { listingsTag, listingsSearch } from "/src/js/queryString.js";
import { loadingWheel } from "/src/js/pages/profile.js";

const listingsContainer = document.querySelector("#listings");

/**
 * Default listing list. Sorted by date created descending. Fetches all listings from api, creates list that's been filtered of all listings with end date older than current date, and then generates html using that list.
 */
async function fetchListingsbyDateCreatedDescending(url) {
  try {
    listingsContainer.innerHTML = "";
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRaw = await response.json();
    console.log(dataRaw);
    if (dataRaw.status == "Too Many Requests") {
      loadingWheel.classList.add("d-none");
      listingsContainer.innerHTML = `<h4 class="red-color mt-4">Error: ${dataRaw.status}. Please wait a minute before trying again.</h4>`;
    }
    const activeListings = dataRaw.filter(
      (x) => Date.parse(x.endsAt) > new Date()
    );
    //const closedListings = dataRaw.filter(x => Date.parse(x.endsAt) < new Date());
    const data = activeListings.sort(byDateCreatedDescending);
    loadingWheel.classList.add("d-none");
    for (let i = 0; i < data.length; i++) {
      try {
        if (`${data[i].media.length}` > 0) {
          try {
            listingsContainer.innerHTML += `
                          <div class="listing-card mb-3">
                              <div
                                  class="d-flex justify-content-center align-items-center listing-img-container rounded-1"
                              >
                                  <a
                                      href="/pages/listing.html?id=${
                                        data[i].id
                                      }"
                                      class="rounded-1"
                                      ><img
                                          src="${data[i].media[0]}"
                                          class="rounded-1"
                                          alt="listing image"
                                  /></a>
                              </div>
                              <div class="listing-text-container">
                                  <a href="/pages/listing.html?id=${
                                    data[i].id
                                  }" class="krub-bold"
                                      >${data[i].title}</a
                                  >
                                  <div class="d-flex justify-content-between">
                                      <a href="/pages/listing.html?id=${
                                        data[i].id
                                      }" class="inter-regular" title="${data[
              i
            ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(
              8,
              10
            )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
              0,
              4
            )}"
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
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            listingsContainer.innerHTML += `<div class="listing-card mb-3">
                              <div class="d-flex justify-content-center align-items-center listing-img-container rounded-1"
                              >
                                  <a
                                      href="/pages/listing.html?id=${
                                        data[i].id
                                      }"
                                      class="rounded-1
                                      "
                                      ><img
                                          src="/resources/no_image.svg"
                                          class="rounded-1"
                                          alt="listing image"
                                  /></a>
                              </div>
                              <div class="listing-text-container">
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
            ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(
              8,
              10
            )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
              0,
              4
            )}"
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
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

if (listingsTag) {
  fetchListingsbyDateCreatedDescending(
    `${apiBaseUrl}/listings?_tag=${listingsTag}`
  );
}
if (listingsSearch) {
  listingsContainer.innerHTML = "";
} else {
  fetchListingsbyDateCreatedDescending(`${apiBaseUrl}/listings`);
}

/**
 * Alternate sorted listing list. Sorted by date created ascending. Fetches all listings from api, creates list that's been filtered of all listings with end date older than current date, and then generates html using that list.
 */
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
    if (dataRaw.status == "Too Many Requests") {
      loadingWheel.classList.add("d-none");
      listingsContainer.innerHTML = `<h4 class="red-color mt-4">Error: ${dataRaw.status}. Please wait a minute before trying again.</h4>`;
    }
    const activeListings = dataRaw.filter(
      (x) => Date.parse(x.endsAt) > new Date()
    );
    console.log(activeListings);
    const data = activeListings.sort(byDateCreatedAscending);
    loadingWheel.classList.add("d-none");
    for (let i = 0; i < data.length; i++) {
      try {
        if (`${data[i].media.length}` > 0) {
          try {
            listingsContainer.innerHTML += `
                          <div class="listing-card mb-3">
                              <div
                                  class="d-flex justify-content-center align-items-center listing-img-container rounded-1"
                              >
                                  <a
                                      href="/pages/listing.html?id=${
                                        data[i].id
                                      }"
                                      class="rounded-1"
                                      ><img
                                          src="${data[i].media[0]}"
                                          class="rounded-1"
                                          alt="listing image"
                                  /></a>
                              </div>
                              <div class="listing-text-container">
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
            ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(
              8,
              10
            )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
              0,
              4
            )}"
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
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            listingsContainer.innerHTML += `
                          <div class="listing-card mb-3">
                              <div
                                  class="d-flex justify-content-center align-items-center listing-img-container rounded-1"
                              >
                                  <a
                                      href="/pages/listing.html?id=${
                                        data[i].id
                                      }"
                                      class="rounded-1"
                                      ><img
                                          src="/resources/no_image.svg"
                                          class="rounded-1"
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
            ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(
              8,
              10
            )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
              0,
              4
            )}"
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
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * Alternate sorted listing list. Sorted by end date descending. Fetches all listings from api, creates list that's been filtered of all listings with end date older than current date, and then generates html using that list.
 */
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
    if (dataRaw.status == "Too Many Requests") {
      loadingWheel.classList.add("d-none");
      listingsContainer.innerHTML = `<h4 class="red-color mt-4">Error: ${dataRaw.status}. Please wait a minute before trying again.</h4>`;
    }
    const activeListings = dataRaw.filter(
      (x) => Date.parse(x.endsAt) > new Date()
    );
    console.log(activeListings);
    const data = activeListings.sort(byEndDateDescending);
    loadingWheel.classList.add("d-none");
    for (let i = 0; i < data.length; i++) {
      try {
        if (`${data[i].media.length}` > 0) {
          try {
            listingsContainer.innerHTML += `
                          <div class="listing-card mb-3">
                              <div
                                  class="d-flex justify-content-center align-items-center listing-img-container rounded-1"
                              >
                                  <a
                                      href="/pages/listing.html?id=${
                                        data[i].id
                                      }"
                                      class="rounded-1"
                                      ><img
                                          src="${data[i].media[0]}"
                                          class="rounded-1"
                                          alt="listing image"
                                  /></a>
                              </div>
                              <div class="listing-text-container">
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
            ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(
              8,
              10
            )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
              0,
              4
            )}"
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
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            listingsContainer.innerHTML += `
                          <div class="listing-card mb-3">
                              <div
                                  class="d-flex justify-content-center align-items-center"
                              >
                                  <a
                                      href="/pages/listing.html?id=${
                                        data[i].id
                                      }"
                                      class="listing-img-container rounded-2"
                                      ><img
                                          src="/resources/no_image.svg"
                                          class="rounded-1"
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
            ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(
              8,
              10
            )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
              0,
              4
            )}"
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
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * Alternate sorted listing list. Sorted by end date ascending. Fetches all listings from api, creates list that's been filtered of all listings with end date older than current date, and then generates html using that list.
 */
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
    if (dataRaw.status == "Too Many Requests") {
      loadingWheel.classList.add("d-none");
      listingsContainer.innerHTML = `<h4 class="red-color mt-4">Error: ${dataRaw.status}. Please wait a minute before trying again.</h4>`;
    }
    const activeListings = dataRaw.filter(
      (x) => Date.parse(x.endsAt) > new Date()
    );
    console.log(activeListings);
    const data = activeListings.sort(byEndDateAscending);
    loadingWheel.classList.add("d-none");
    for (let i = 0; i < data.length; i++) {
      try {
        if (`${data[i].media.length}` > 0) {
          try {
            listingsContainer.innerHTML += `
                          <div class="listing-card mb-3">
                              <div
                                  class="d-flex justify-content-center align-items-center listing-img-container rounded-1"
                              >
                                  <a
                                      href="/pages/listing.html?id=${
                                        data[i].id
                                      }"
                                      class="rounded-1"
                                      ><img
                                          src="${data[i].media[0]}"
                                          class="rounded-2"
                                          alt="listing image"
                                  /></a>
                              </div>
                              <div class="listing-text-container">
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
            ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(
              8,
              10
            )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
              0,
              4
            )}"
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
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            listingsContainer.innerHTML += `
                          <div class="listing-card mb-3">
                              <div
                                  class="d-flex justify-content-center align-items-center"
                              >
                                  <a
                                      href="/pages/listing.html?id=${
                                        data[i].id
                                      }"
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
            ].endsAt.substring(11, 16)} ${data[i].endsAt.substring(
              8,
              10
            )}.${data[i].endsAt.substring(5, 7)}.${data[i].endsAt.substring(
              0,
              4
            )}"
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
          } catch (e) {
            console.log(e);
          }
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

try {
  dateCreatedDescendingBtn.addEventListener("click", () => {
    loadingWheel.classList.remove("d-none");
    loadingWheel.classList.add("d-block");
    if (listingsTag) {
      try {
        fetchListingsbyDateCreatedDescending(
          `${apiBaseUrl}/listings?_tag=${listingsTag}`
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        fetchListingsbyDateCreatedDescending(`${apiBaseUrl}/listings`);
      } catch (e) {
        console.log(e);
      }
    }
  });
} catch (e) {
  console.log(e);
}

try {
  dateCreatedAscendingBtn.addEventListener("click", () => {
    loadingWheel.classList.remove("d-none");
    loadingWheel.classList.add("d-block");
    if (listingsTag) {
      try {
        fetchListingsbydateCreatedAscending(
          `${apiBaseUrl}/listings?_tag=${listingsTag}`
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        fetchListingsbydateCreatedAscending(`${apiBaseUrl}/listings`);
      } catch (e) {
        console.log(e);
      }
    }
  });
} catch (e) {
  console.log(e);
}

try {
  endDateDescendingBtn.addEventListener("click", () => {
    loadingWheel.classList.remove("d-none");
    loadingWheel.classList.add("d-block");
    if (listingsTag) {
      try {
        fetchListingsbyendDateDescending(
          `${apiBaseUrl}/listings?_tag=${listingsTag}`
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        fetchListingsbyendDateDescending(`${apiBaseUrl}/listings`);
      } catch (e) {
        console.log(e);
      }
    }
  });
} catch (e) {
  console.log(e);
}

try {
  endDateAscendingBtn.addEventListener("click", () => {
    loadingWheel.classList.remove("d-none");
    loadingWheel.classList.add("d-block");
    if (listingsTag) {
      try {
        fetchListingsbyendDateAscending(
          `${apiBaseUrl}/listings?_tag=${listingsTag}`
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        fetchListingsbyendDateAscending(`${apiBaseUrl}/listings`);
      } catch (e) {
        console.log(e);
      }
    }
  });
} catch (e) {
  console.log(e);
}
