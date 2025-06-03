import { onBid, showBidders } from "../../ui/listing/bid";

/**
 * Initializes event listeners for a modal dialog.
 * - Closes the modal when the close button is clicked.
 * - Closes the modal when clicking outside the modal content (on the modal background).
 * Logs an error if the modal or close button elements are not found in the DOM.
 */

const initializeModalListeners = () => {
    const closeModalButton = document.getElementById("closeModal");
    const biddersModal = document.getElementById("biddersModal");

    if (!closeModalButton || !biddersModal) {
        console.error("Modal or close button not found in DOM.");
        return;
    }

    closeModalButton.addEventListener("click", () => {
        biddersModal.classList.add("hidden");
    });

    window.addEventListener("click", (event) => {
        if (event.target === biddersModal) {
            biddersModal.classList.add("hidden");
        }
    });
};

document.addEventListener("DOMContentLoaded", initializeModalListeners);

/**
 * Renders a list of auction listings into the DOM, including images, seller info, title, description,
 * countdown timer, current bid, bid form, and action buttons. Handles bid submission and modal display for bidders.
 *
 * @param {Array<Object>} listings - Array of listing objects to display. Each listing should contain:
 *   @param {string} listings[].id - Unique identifier for the listing.
 *   @param {string} listings[].title - Title of the listing.
 *   @param {string} listings[].description - Description of the listing.
 *   @param {Object} [listings[].seller] - Seller information.
 *   @param {string} [listings[].seller.name] - Name of the seller.
 *   @param {Array<Object>} [listings[].media] - Array of media objects for the listing.
 *   @param {string} [listings[].media[].url] - URL of the media image.
 *   @param {string} [listings[].media[].alt] - Alt text for the media image.
 *   @param {string} listings[].endsAt - ISO date string for when the auction ends.
 *   @param {Array<Object>} [listings[].bids] - Array of bid objects for the listing.
 *   @param {number} [listings[].bids[].amount] - Amount of the bid.
 *
 * @returns {void}
 */

export const displayListings = (listings) => {
    const listingContainer = document.getElementById("listingContainer");

    if (!listingContainer) {
        console.error("No container with id `listingContainer` found");
        return;
    }

    const isLoggedIn = !!localStorage.getItem("token"); 

    listings.forEach(listing => {
        const container = document.createElement("div");
        container.className = "listingContainer bg-[#2B2D42] p-5 mb-5 border border-gray-300 rounded-lg";

        const defaultImageUrl = "/image/placeholder-transparent.png";

        const image = document.createElement("img");
        image.className = "listingImage w-full max-h-48 object-cover rounded-md";

        if (Array.isArray(listing.media) && listing.media.length > 0 && listing.media[0]?.url) {
            const mediaItem = listing.media[0];
            image.src = mediaItem.url;
            image.alt = mediaItem.alt || "Listing image";
        } else {
            image.src = defaultImageUrl;
            image.alt = "Default placeholder image";
        }

        const sellerName = document.createElement("h2");
        sellerName.innerText = listing.seller?.name || "Unknown Seller";
        sellerName.className = "listingName font-bold mb-2 mt-2";

        const title = document.createElement("h3");
        title.innerText = listing.title;
        title.className = "listingTitle font-medium text-darkSlate mb-2 line-clamp-2";

        const description = document.createElement("p");
        description.innerText = listing.description;
        description.className = "listingDescription text-sm text-gray-200  line-clamp-2 break-all";

        const endsAt = document.createElement("h4");
        endsAt.className = "endsAt mt-2";

        const listingEndTime = new Date(listing.endsAt).getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = listingEndTime - now;

            if (timeLeft < 0) {
                clearInterval(countdownInterval);
                endsAt.innerText = "Auction ended";
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            endsAt.innerText = `Ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();

        const currentBid = document.createElement("p");
        currentBid.className = "currentBid text-lg font-semibold mt-2";
        if (listing.bids && Array.isArray(listing.bids) && listing.bids.length > 0) {
            const highestBid = Math.max(...listing.bids.map(bid => bid.amount));
            currentBid.innerText = `Current Bid: $${highestBid.toFixed(2)}`;
        } else {
            currentBid.innerText = "No Bids Yet";
        }

        const separator = document.createElement("div");
        separator.className = "border-t border-gray-300 my-4";

        const bidForm = document.createElement("form");
        bidForm.className = "bidForm flex flex-col space-y-4";

        const bidInput = document.createElement("input");
        bidInput.name = "bidInput";
        bidInput.type = "number";
        bidInput.placeholder = "Enter your bid";
        bidInput.min = "0";
        bidInput.className = "bidInput text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accentRed";

        const bidButton = document.createElement("button");
        bidButton.type = "submit";
        bidButton.innerText = "Place Bid";
        bidButton.className = "bidButton bg-[#B11125] text-white py-2 px-4 rounded-md hover:bg-red-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-accentRed";


        if (!isLoggedIn) {
            bidButton.disabled = true; 
            bidButton.title = "You must be logged in to place a bid."; 
            bidButton.classList.add("cursor-not-allowed", "opacity-50");  
            bidInput.disabled = true; 
        } else {
            bidForm.addEventListener("submit", async (event) => {
                event.preventDefault();

                if (!bidInput.value || bidInput.value <= 0) {
                    alert("Please enter a valid bid amount before placing your bid.");
                    return;
                }

                try {
                    await onBid(event, listing.id);
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } catch (error) {
                    console.error("Failed to place bid:", error);
                    alert("There was an issue placing your bid. Please try again.");
                }
            });
        }

        bidForm.appendChild(bidInput);
        bidForm.appendChild(bidButton);

        const openModal = document.getElementById("biddersModal");

        const viewBiddersButton = document.createElement("button");
        viewBiddersButton.innerText = "View Bidders";
        viewBiddersButton.id = "viewBidsButton";
        viewBiddersButton.className = "viewBiddersButton text-white py-2 mt-5 px-4 rounded-md hover:bg-accentRed/90 focus:outline-none focus:ring-2 focus:ring-accentRed";

        if (!isLoggedIn) {
            viewBiddersButton.disabled = true;
            viewBiddersButton.title = "You must be logged in to view bidders.";
            viewBiddersButton.classList.add("cursor-not-allowed", "opacity-50");
        } else {
            viewBiddersButton.addEventListener("click", () => {
                openModal.classList.add("flex");
                showBidders(listing.id);
            });
        }

        const viewButton = document.createElement("button");
        viewButton.innerText = "View Listing";
        viewButton.className = "viewButton bg-darkSlate text-white py-2 mt-5 px-4 rounded-md hover:bg-darkSlate/80 focus:outline-none focus:ring-2 focus:ring-darkSlate";

        viewButton.addEventListener('click', () => {
            window.location.href = `/post/?id=${listing.id}`;
            localStorage.setItem("listingId", JSON.stringify(listing.id));
        });

        container.append(image, sellerName, title, description, endsAt, currentBid, separator, bidForm, viewBiddersButton, viewButton);
        listingContainer.appendChild(container);
    });

    initializeModalListeners();
};