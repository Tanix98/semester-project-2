export { listingId, profileUserName, listingsTag, listingsSearch };

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const listingId = params.get("id");

const listingsTag = params.get("tag");

const listingsSearch = params.get("search");

const profileUserName = params.get("user");
