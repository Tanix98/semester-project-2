export { listingId, profileUserName };

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const listingId = params.get("id");

const profileUserName = params.get("user");
