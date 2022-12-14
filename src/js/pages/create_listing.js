import { apiBaseUrl } from "/src/js/api.js";
import { userToken } from "/src/js/localStorage.js";

const titleInput = document.querySelector("#title-input");
const endDateInput = document.querySelector("#end-date-input");
const mediaUrlInput = document.querySelector("#image-url-input");
const tagsInput = document.querySelector("#tags-input");
const descriptionInput = document.querySelector("#description-input");

endDateInput.value = "2023-12-01T00:00:00.000Z";
const createListingMessage = document.querySelector("#create-listing-message");

async function createListing(url) {
    try {
        const sendBody = {
            title: `${titleInput.value}`,
            description: `${descriptionInput.value}`,
            tags: [`${tagsInput.value}`],
            media: [`${mediaUrlInput.value}`],
            endsAt: `${endDateInput.value}`
        };
        const response = await fetch(`${url}`, {
            method: "POST",
            body: JSON.stringify(sendBody),
            headers: {
                "Authorization": userToken,
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        createListingMessage.style.display = "block";
        if (data.errors) {
            createListingMessage.classList.add("red-color");
            createListingMessage.innerHTML = "Error: " + data.status;
        }
        if (data.id) {
            console.log(data.id);
            createListingMessage.innerHTML = "Listing created!";
            setTimeout(function () {
                window.location.href = `/pages/listing.html?id=${data.id}`;
            }, 1000);
        }
    } catch (e) {
        console.log(e);
    }
}

const createListingBtn = document.querySelector("#create-listing-btn");
createListingBtn.addEventListener("click", function (e) {
    e.preventDefault();
    createListing(`${apiBaseUrl}/listings`);
});