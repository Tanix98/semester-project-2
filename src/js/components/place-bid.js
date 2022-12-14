import { apiBaseUrl } from "/src/js/api.js";
import { userToken } from "/src/js/localStorage.js";
import { listingId } from "/src/js/queryString.js";

function waitForListingPage() {
    try {
        const bidCreditAmountDesktop = document.querySelector(
        "#bid-credit-input-desktop"
        );
        const bidCreditAmountMobile = document.querySelector(
        "#bid-credit-input-mobile"
        );

        const placeBidMessageMobile = document.querySelector("#place-bid-message-mobile");
        const placeBidMessageDesktop = document.querySelector("#place-bid-message-desktop");

        async function placeListingBid(url, sendBody) {
            const response = await fetch(`${url}`, {
                method: "POST",
                body: JSON.stringify(sendBody),
                headers: {
                    "Authorization": userToken,
                    "Content-Type": "application/json"
                },
            });
            const data = await response.json();
            if (data.errors) {
                placeBidMessageMobile.style.display = "block";
                placeBidMessageDesktop.style.display = "block";
                placeBidMessageMobile.classList.add("red-color");
                placeBidMessageMobile.innerHTML = "Error: " + data.status;
                placeBidMessageDesktop.classList.add("red-color");
                placeBidMessageDesktop.innerHTML = "Error: " + data.status;
            }
            else {
                placeBidMessageMobile.style.display = "none";
                placeBidMessageDesktop.style.display = "none";
                location.reload();
            }
        }
        document.addEventListener("click", function(e){
            const target1 = e.target.closest("#place-bid-btn-desktop");
            if(target1){
                const sendBody = {
                    amount: parseFloat(bidCreditAmountDesktop.value),
                };
                placeListingBid(`${apiBaseUrl}/listings/${listingId}/bids`, sendBody);
            }
            const target2 = e.target.closest("#place-bid-btn-mobile");
            if(target2){
                const sendBody = {
                    amount: parseFloat(bidCreditAmountMobile.value),
                };
                placeListingBid(`${apiBaseUrl}/listings/${listingId}/bids`, sendBody);
            }
          });
    } catch (e) {
        console.log(e);
    }
}

setTimeout(function () {
    waitForListingPage();
  }, 3000);