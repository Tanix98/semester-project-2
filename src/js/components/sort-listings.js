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
