const editListingBtn = document.getElementsByClassName("edit-listing-btn");

const deleteListingBtn = document.getElementsByClassName("delete-listing-btn");

const biddingBtn = document.getElementsByClassName("bidding-button");

const editListingFunction = function () {
  window.location.href = "/pages/edit_listing.html";
};

for (let i = 0; i < editListingBtn.length; i++) {
  editListingBtn[i].addEventListener("click", editListingFunction);
}

const deleteListing = function () {
  console.log("This function will later delete the listing");
};

for (let i = 0; i < deleteListingBtn.length; i++) {
  deleteListingBtn[i].addEventListener("click", deleteListing);
}

const openCreateBidModal = function () {
  console.log(
    "This function will later open modal to create bid on the listing"
  );
};

for (let i = 0; i < biddingBtn.length; i++) {
  biddingBtn[i].addEventListener("click", openCreateBidModal);
}
