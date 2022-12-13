function waitForProfilePage() {
  /*const profileImg = document.querySelector(".profile-img");*/
  const editPfpBtn = document.querySelector("#edit-pfp-button");
  const editProfileImg = document.querySelector(".edit-pfp-modal");
  const modalBackground = document.querySelector(".modal-background-edit-pfp");
  const pfpModalX = document.querySelector(".pfp-modal-x");

  editPfpBtn.addEventListener("click", function () {
    editProfileImg.style.display = "flex";
  });

  /*profileImg.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
          profileImg.click();
      }
  });*/

  modalBackground.addEventListener("click", function () {
    editProfileImg.style.display = "none";
  });

  pfpModalX.addEventListener("click", function () {
    editProfileImg.style.display = "none";
  });
}

setTimeout(function () {
  waitForProfilePage();
}, 600);