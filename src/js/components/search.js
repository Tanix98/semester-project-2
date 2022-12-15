import { apiBaseUrl } from "/src/js/api.js";
import { listingsContainer } from "/src/js/components/fetch-listings.js";
import { listingsSearch } from "/src/js/queryString.js";
import { searchBar } from "/src/js/components/header.js";

async function listingSearch(url) {
  try {
    searchBar[0].value = listingsSearch;
    searchBar[1].value = listingsSearch;

    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const filteredData = data.filter((listing) =>
      listing.title.toLowerCase().match(`${listingsSearch.toLowerCase()}`)
    );
    listingsContainer.innerHTML = "";
    if (filteredData.length > 0) {
      for (let i = 0; i < filteredData.length; i++) {
        if (`${filteredData[i].media.length}` > 0) {
          listingsContainer.innerHTML += `
                          <div class="listing-card mb-3">
                              <div
                                  class="d-flex justify-content-center align-items-center"
                              >
                                  <a
                                      href="/pages/listing.html?id=${
                                        filteredData[i].id
                                      }"
                                      class="listing-img-container rounded-1"
                                      ><img
                                          src="${filteredData[i].media[0]}"
                                          class="rounded-1"
                                          alt="listing image"
                                  /></a>
                              </div>
                              <div class="listing-text-container">
                                  <a href="/pages/listing.html?id=${
                                    filteredData[i].id
                                  }" class="krub-bold"
                                      >${filteredData[i].title}</a
                                  >
                                  <div class="d-flex justify-content-between">
                                      <a href="/pages/listing.html?id=${
                                        filteredData[i].id
                                      }" class="inter-regular" title="${filteredData[
            i
          ].endsAt.substring(11, 16)} ${filteredData[i].endsAt.substring(
            8,
            10
          )}.${filteredData[i].endsAt.substring(5, 7)}.${filteredData[
            i
          ].endsAt.substring(0, 4)}"
                                          >Ends at: ${filteredData[
                                            i
                                          ].endsAt.substring(
                                            11,
                                            16
                                          )}, ${filteredData[
            i
          ].endsAt.substring(8, 10)}.${filteredData[i].endsAt.substring(
            5,
            7
          )}.${filteredData[i].endsAt.substring(2, 4)}</a
                                      >
                                      <a href="/pages/listing.html?id=${
                                        filteredData[i].id
                                      }" class="inter-regular"
                                          >Bids: ${
                                            filteredData[i]._count.bids
                                          }</a
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
                                      href="/pages/listing.html?id=${
                                        filteredData[i].id
                                      }"
                                      class="listing-img-container rounded-1
                                      "
                                      ><img
                                          src="/resources/no_image.svg"
                                          class="rounded-1"
                                          alt="listing image"
                                  /></a>
                              </div>
                              <div class="listing-text-container">
                                  <a href="/pages/listing.htmlid=${
                                    filteredData[i].id
                                  }" class="krub-bold"
                                      >${filteredData[i].title}</a
                                  >
                                  <div class="d-flex justify-content-between">
                                      <a href="/pages/listing.html?id=${
                                        filteredData[i].id
                                      }" class="inter-regular" title="${filteredData[
            i
          ].endsAt.substring(11, 16)} ${filteredData[i].endsAt.substring(
            8,
            10
          )}.${filteredData[i].endsAt.substring(5, 7)}.${filteredData[
            i
          ].endsAt.substring(0, 4)}"
                                          >Ends at: ${filteredData[
                                            i
                                          ].endsAt.substring(
                                            11,
                                            16
                                          )}, ${filteredData[
            i
          ].endsAt.substring(8, 10)}.${filteredData[i].endsAt.substring(
            5,
            7
          )}.${filteredData[i].endsAt.substring(2, 4)}</a
                                      >
                                      <a href="/pages/listing.html?id=${
                                        filteredData[i].id
                                      }" class="inter-regular"
                                          >Bids: ${
                                            filteredData[i]._count.bids
                                          }</a
                                      >
                                  </div>
                              </div>
                          </div>
                      `;
        }
      }
    }
    if (filteredData.length == 0) {
      listingsContainer.innerHTML = `<h2>No search results for "${searchBar.value}"</h2>`;
    }
    if (data.statusCode === 429 || data.status == "Too Many Requests") {
      listingsContainer.innerHTML = `<h2 class="red-color inter-medium mb-0 text-center">Error: " + ${data.errors[0].message}</h2>`;
    }
  } catch (e) {
    console.log(e);
    listingsContainer.innerHTML = `<h2 class="red-color inter-medium mb-0 text-center">Error: Too Many Requests. Please wait a minute before trying again</h2>`;
  }
}

if (listingsSearch) {
  listingSearch(`${apiBaseUrl}/listings`);
}
