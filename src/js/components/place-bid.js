import { apiBaseUrl } from "/src/js/api.js";
import { userToken } from "/src/js/localStorage.js";
import { listingId } from "/src/js/queryString.js";

function waitForListingPage() {
    try {
        const placeBidButtonDesktop = document.querySelector("#place-bid-btn-desktop");
        const placeBidButtonMobile = document.querySelector("#place-bid-btn-mobile");
        const bidCreditAmountDesktop = document.querySelector(
        "#bid-credit-input-desktop"
        );
        const bidCreditAmountMobile = document.querySelector(
        "#bid-credit-input-mobile"
        );

        const bidErrorDesktop1 = document.querySelector("#bid-error-desktop-1");
        const bidErrorDesktop2 = document.querySelector("#bid-error-desktop-2");
        const bidErrorDesktop3 = document.querySelector("#bid-error-desktop-3");
        const bidErrorMobile1 = document.querySelector("#bid-error-mobile-1");
        const bidErrorMobile2 = document.querySelector("#bid-error-mobile-2");
        const bidErrorMobile3 = document.querySelector("#bid-error-mobile-3");

        async function placeListingBid(url, sendBody) {
            const response = await fetch(`${url}`, {
                method: "POST",
                body: `${sendBody}`,
                headers: {
                    "Authorization": userToken,
                    "Content-Type": "application/json"
                },
            });
            console.log(`${sendBody}` + "'s type is: " + typeof `${sendBody}`);
            const data = await response.json();
            console.log(data);
            if (data.statusCode == 500 || data.statusCode == 400) {
                bidErrorDesktop1.style.display = "block";
                bidErrorDesktop2.style.display = "block";
                bidErrorDesktop3.style.display = "block";
                bidErrorMobile1.style.display = "block";
                bidErrorMobile2.style.display = "block";
                bidErrorMobile3.style.display = "block";
            } else {
                bidErrorDesktop1.style.display = "none";
                bidErrorDesktop2.style.display = "none";
                bidErrorDesktop3.style.display = "none";
                bidErrorMobile1.style.display = "none";
                bidErrorMobile2.style.display = "none";
                bidErrorMobile3.style.display = "none";
            }
        }

        placeBidButtonDesktop.addEventListener("click", () => {
            const sendBody = {
                "amount": parseFloat(bidCreditAmountDesktop.value),
            };
            placeListingBid(`${apiBaseUrl}/listings/${listingId}/bids`, sendBody);
            console.log(bidCreditAmountDesktop.value);
            console.log(sendBody);
            console.log("Type is: " + typeof parseFloat(bidCreditAmountMobile.value));
        });
        placeBidButtonMobile.addEventListener("click", () => {
            const sendBody = {
            amount: bidCreditAmountMobile.value,
            };
            placeListingBid(`${apiBaseUrl}/listings/${listingId}/bids`, sendBody);
        });
    } catch (e) {
        console.log(e);
    }
}

setTimeout(function () {
    waitForListingPage();
  }, 800);