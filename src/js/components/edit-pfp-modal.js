import { apiBaseUrl } from "/src/js/api.js";
import { userToken, userName } from "/src/js/localStorage.js";

function waitForProfilePage() {
  /*const profileImg = document.querySelector(".profile-img");*/
  const editPfpBtn = document.querySelector("#edit-pfp-button");
  const editProfileImg = document.querySelector(".edit-pfp-modal");
  const modalBackground = document.querySelector(".modal-background-edit-pfp");
  const pfpModalX = document.querySelector(".pfp-modal-x");

  editPfpBtn.addEventListener("click", function () {
    editProfileImg.style.display = "flex";
  });

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

const mediaUrlInput = document.querySelector("#media-url-input");
const confirmPfpEditBtn = document.querySelector("#confirm-pfp-edit-btn");
const editPfpMessage = document.querySelector("#edit-pfp-message");

confirmPfpEditBtn.addEventListener("click", function () {
  updateProfilePicture(`${apiBaseUrl}/profiles/${userName}/media`);
});

async function updateProfilePicture(url) {
  const sendBody = {
    avatar: `${mediaUrlInput.value}`,
  };
  try {
    const response = await fetch(`${url}`, {
      method: "PUT",
      body: JSON.stringify(sendBody),
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    console.log(`${mediaUrlInput.value}`);
    editPfpMessage.style.display = "block";
    if (data.errors) {
      editPfpMessage.classList.add("red-color");
      editPfpMessage.innerHTML = "Error: " + data.status;
    } else {
      editPfpMessage.innerHTML = "Profile picture updated!";
      setTimeout(function () {
        localStorage.removeItem("userAvatar");
        localStorage.setItem("userAvatar", data.avatar);
        location.reload();
      }, 1500);
    }
  } catch (e) {
    console.log(e);
  }
}
