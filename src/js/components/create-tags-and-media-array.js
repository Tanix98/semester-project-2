export { tagList, mediaList, createListingMediaContainer };

// Form tags field
const createListingTagsContainer = document.querySelector(
  ".listing-tags-container"
);
const tagsInputField = document.querySelector("#tags-input-field");

let tagList = [];

function createTag(label) {
  const div = document.createElement("div");
  div.setAttribute("class", "listing-tag p-1 m-1 rounded-1 overflow-hidden");
  const span = document.createElement("span");
  span.innerHTML = label;
  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("class", "tag-x ms-1 mb-0");
  closeBtn.setAttribute("data-item", label);
  closeBtn.setAttribute("tabindex", "0");
  closeBtn.innerHTML = `&times;`;
  div.appendChild(span);
  div.appendChild(closeBtn);
  return div;
}

function resetTagsArray() {
  document.querySelectorAll(".listing-tag").forEach(function (tag) {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  resetTagsArray();
  tagList
    .slice()
    .reverse()
    .forEach(function (tag) {
      const input = createTag(tag);
      createListingTagsContainer.prepend(input);
    });
  console.log(tagList);
}

tagsInputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && tagsInputField.value.trim() !== "") {
    e.preventDefault();
    tagList.push(tagsInputField.value);
    addTags();
    tagsInputField.value = "";
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("tag-x")) {
    const value = e.target.getAttribute("data-item");
    const index = tagList.indexOf(value);
    tagList = [...tagList.slice(0, index), ...tagList.slice(index + 1)];
    addTags();
  }
});

// Form tags field
const createListingMediaContainer = document.querySelector(
  ".listing-media-container"
);
const mediaInputField = document.querySelector("#media-input-field");

let mediaList = [];

function createMedia(label) {
  const div = document.createElement("div");
  div.setAttribute(
    "class",
    "listing-media p-1 m-1 rounded-1 overflow-hidden d-flex d-column"
  );
  const span = document.createElement("span");
  span.setAttribute("class", "ms-3");
  span.innerHTML = label;
  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("class", "media-x ms-1 mb-0");
  closeBtn.setAttribute("data-item", label);
  closeBtn.setAttribute("tabindex", "0");
  closeBtn.innerHTML = `&times;`;
  div.appendChild(span);
  div.appendChild(closeBtn);
  return div;
}

function resetMediaArray() {
  document.querySelectorAll(".listing-media").forEach(function (media) {
    media.parentElement.removeChild(media);
  });
}

function addMedia() {
  resetMediaArray();
  mediaList
    .slice()
    .reverse()
    .forEach(function (media) {
      const input = createMedia(media);
      createListingMediaContainer.prepend(input);
    });
  console.log(mediaList);
}

mediaInputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && mediaInputField.value.trim() !== "") {
    e.preventDefault();
    mediaList.push(mediaInputField.value);
    addMedia();
    mediaInputField.value = "";
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("media-x")) {
    const value = e.target.getAttribute("data-item");
    const index = mediaList.indexOf(value);
    mediaList = [...mediaList.slice(0, index), ...mediaList.slice(index + 1)];
    addMedia();
  }
});
