import { apiBaseUrl } from "/src/js/api.js";
import { listingId } from "/src/js/queryString.js";
import { userToken } from "/src/js/localStorage.js";

const titleInput = document.querySelector("#title-input");
const mediaUrlInput = document.querySelector("#image-url-input");
const tagsInput = document.querySelector("#tags-input");
const descriptionInput = document.querySelector("#description-input");

async function fetchListing(url) {
    try {
        const response = await fetch(`${url}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);

        const listingTitle = data.title;
        const listingMediaUrl = data.media;
        const listingTags = data.tags;
        const listingDescription = data.description;
        if (listingTitle !== "" || listingTitle !== " " || listingTitle !== null || listingTitle !== undefined) {
            titleInput.value = listingTitle;
        }
        if (listingTags.length > 0) {
            tagsInput.value = listingTags;
        }
        if (listingMediaUrl !== "") {
            mediaUrlInput.value = listingMediaUrl;
        }
        if (listingDescription !== "" || listingDescription !== null || listingDescription !== undefined) {
            descriptionInput.value = listingDescription;
        }
    } catch (e) {
        console.log(e);
    }
}

fetchListing(`${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`);

const editListingBtn = document.querySelector("#edit-listing-btn");
const editListingMessage = document.querySelector("#edit-listing-message");
editListingBtn.addEventListener("click", function (e) {
    e.preventDefault();
    editListing(`${apiBaseUrl}/listings/${listingId}`);
});

async function editListing(url) {
    try {
        const sendBody = {
            title: `${titleInput.value}`,
            description: `${descriptionInput.value}`,
            tags: [`${tagsInput.value}`],
            media: [`${mediaUrlInput.value}`]
        };
        const response = await fetch(`${url}`, {
            method: "PUT",
            body: JSON.stringify(sendBody),
            headers: {
                "Authorization": userToken,
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        console.log(data);
        editListingMessage.style.display = "block";
        if (data.errors) {
            editListingMessage.classList.add("red-color");
            editListingMessage.innerHTML = "Error: " + data.status;
        }
        else {
            editListingMessage.innerHTML = "Listing updated!";
            window.location.href = `/pages/listing.html?id=${listingId}`;
        }
    } catch (e) {
        console.log(e);
    }
}