export {
  byDateCreatedDescending,
  byDateCreatedAscending,
  byEndDateDescending,
  byEndDateAscending,
};

// Sort listings functions
function byDateCreatedDescending(a, b) {
  if (a.created > b.created) {
    return -1;
  } else if (b.created > a.created) {
    return 1;
  } else {
    return 0;
  }
}
function byDateCreatedAscending(a, b) {
  if (a.created > b.created) {
    return 1;
  } else if (b.created > a.created) {
    return -1;
  } else {
    return 0;
  }
}
function byEndDateDescending(a, b) {
  if (a.endsAt > b.endsAt) {
    return 1;
  } else if (b.endsAt > a.endsAt) {
    return -1;
  } else {
    return 0;
  }
}
function byEndDateAscending(a, b) {
  if (a.endsAt > b.endsAt) {
    return -1;
  } else if (b.endsAt > a.endsAt) {
    return 1;
  } else {
    return 0;
  }
}

// Sort listings button
const dropdownMenuBtn = document.querySelector(".dropdown-button-custom");

const dropdownList = document.querySelector("#dropdown-sort-list");

/*const dropdownItemSelected = document.querySelector(".dropdown-sort-item-selected");

const dateCreatedDescending = document.querySelector("#date-created-descending");

const dateCreatedAscending = document.querySelector("#date-created-ascending");

const endDateDescending = document.querySelector("#end-date-descending");

const endDateAscending = document.querySelector("#end-date-ascending");*/

dropdownList.addEventListener("click", function handleClick(event) {
  for (let i = 0; i < dropdownList.getElementsByTagName("a").length; i++) {
    dropdownList
      .getElementsByTagName("a")
      [i].classList.remove("dropdown-sort-item-selected");
  }
  event.target.classList.add("dropdown-sort-item-selected");
  dropdownMenuBtn.innerHTML = event.target.innerHTML;
});
