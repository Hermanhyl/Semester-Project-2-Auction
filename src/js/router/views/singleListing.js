import { readSingleListing } from "../../api/listing/read";
import { onBid, showBidders } from "../../ui/listing/bid";

/**
 * Initializes event listeners for a modal dialog.
 * - Closes the modal when the close button is clicked.
 * - Closes the modal when clicking outside the modal content (on the modal background).
 * Logs an error if the modal or close button elements are not found in the DOM.
 *
 * @function
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
 * Renders a detailed view of a single auction listing, including images, seller info, description, countdown timer, current bid, bid form, and action buttons.
 *
 * @function
 * @param {Object} listing - The listing object containing all relevant data for the auction item.
 * @param {string} listing.id - The unique identifier for the listing.
 * @param {string} listing.title - The title of the listing.
 * @param {string} listing.description - The description of the listing.
 * @param {Object} listing.seller - The seller information.
 * @param {string} listing.seller.name - The name of the seller.
 * @param {Array<Object>} listing.media - Array of media objects for the listing.
 * @param {string} listing.media[].url - The URL of the media image.
 * @param {string} [listing.media[].alt] - The alt text for the media image.
 * @param {string} listing.endsAt - The ISO date string representing when the auction ends.
 * @param {Array<Object>} listing.bids - Array of bid objects for the listing.
 * @param {number} listing.bids[].amount - The amount of the bid.
 *
 * @returns {void}
 */

const displaySingleListing = (listing) => {
    const singleListingContainer = document.getElementById("singleListingContainer");

    if (!singleListingContainer) {
        console.error("No container with id singleListingContainer found.");
        return;
    }

    const image = document.createElement("img");
    image.className = "listing-image w-full max-h-80 object-cover rounded-lg shadow-md";

    let currentImage = 0;

    const updateImage = () => {
        if (listing.media && listing.media.length > 0) {
            const media = listing.media[currentImage];
            image.src = media.url;
            image.alt = media.alt || "Listing image";
        } else {
            image.src = "";
            image.alt = "No image available";
        }
    };

    updateImage();

    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.className = "next-button text-sm font-bold text-white bg-[#EF233C] px-4 py-2 rounded hover:brightness-110";
    nextButton.addEventListener("click", () => {
        currentImage = (currentImage + 1) % listing.media.length;
        updateImage();
    });

    const prevButton = document.createElement("button");
    prevButton.innerText = "Prev";
    prevButton.className = "prev-button text-sm font-bold text-white bg-[#EF233C] px-4 py-2 rounded hover:brightness-110";
    prevButton.addEventListener("click", () => {
        currentImage = (currentImage - 1 + listing.media.length) % listing.media.length;
        updateImage();
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex justify-between items-center w-full mt-4";

    // Only show buttons if there is more than one image
    if (listing.media && listing.media.length > 1) {
        buttonContainer.appendChild(prevButton);
        buttonContainer.appendChild(nextButton);
    }

    const container = document.createElement("div");
    container.className = "listing-container p-6 bg-[#2B2D42] mb-20 shadow rounded-lg max-w-2xl mx-auto space-y-4";

    const sellerName = document.createElement("h2");
    sellerName.innerText = listing.seller?.name || "Unknown Seller";
    sellerName.className = "seller-name text-xl font-bold text-primary";

    const title = document.createElement("h3");
    title.innerText = listing.title || "Untitled Listing";
    title.className = "listing-title text-lg font-semibold text-secondary";

    const description = document.createElement("p");
    description.innerText = listing.description || "No description provided.";
    description.className = "listing-description text-sm text-secondary leading-relaxed";

    const endsAt = document.createElement("h4");
    endsAt.className = "endsAt mt-2";

    // Countdown logic
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
    updateCountdown(); // Initialize countdown immediately

    const currentBid = document.createElement("p");
    currentBid.className = "current-bid text-base font-semibold text-primary";
    if (listing.bids && Array.isArray(listing.bids) && listing.bids.length > 0) {
        const highestBid = Math.max(...listing.bids.map((bid) => bid.amount));
        currentBid.innerText = `Current Bid: $${highestBid}`;
    } else {
        currentBid.innerText = "No Bids Yet";
    }

    const separator = document.createElement("div");
    separator.className = "border-t border-gray-300 my-4";

    const bidForm = document.createElement("form");
    bidForm.className = "bid-form flex flex-col space-y-2";

    const bidInput = document.createElement("input");
    bidInput.name = "bidInput";
    bidInput.type = "number";
    bidInput.placeholder = "0.00";
    bidInput.min = "0";
    bidInput.className = "bid-input text-black border border-secondary rounded px-4 py-2 text-sm text-primary focus:outline-none focus:ring focus:ring-accent-red";

    const bidButton = document.createElement("button");
    bidButton.type = "submit";
    bidButton.innerText = "Place Bid";
    bidButton.className = "bidButton bg-[#B11125] text-white py-2 px-4 rounded-md hover:bg-red-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-accentRed";

    const isLoggedIn = localStorage.getItem("token");
    const currentUserId = JSON.parse(localStorage.getItem("userInfo")); 
    const isUserListing = listing.seller.name === currentUserId.name
    
    if (!isLoggedIn) {
        bidButton.disabled = true;
        bidButton.title = "You must be logged in to place a bid.";
        bidButton.classList.add("cursor-not-allowed", "opacity-50");
        bidInput.disabled = true;
    } else if (isUserListing) {
        bidButton.disabled = true;
        bidButton.title = "You cannot bid on your own listing!";
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

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "edit-button text-sm font-bold text-white bg-accent-red px-4 py-2 rounded hover:brightness-110";
    editButton.addEventListener("click", () => {
        window.location.href = `../post/edit/?id=${listing.id}`;
    });

    container.append(
        image,
        buttonContainer,
        sellerName,
        title,
        description,
        endsAt,
        currentBid,
        separator,
        bidForm,
        viewBiddersButton,
        editButton
    );
    singleListingContainer.appendChild(container);
};






initializeModalListeners();

/**
 * Asynchronously loads and displays a single listing on the page.
 * Handles errors by displaying an error message in the designated container.
 *
 * @async
 * @function runPage
 * @returns {Promise<void>} Resolves when the listing is loaded and displayed, or an error message is shown.
 */

async function runPage() {
    try {
        const listing = await readSingleListing();
        displaySingleListing(listing);
    } catch (error) {
        console.error("Failed to load the listing:", error);
        const singleListingContainer = document.getElementById("singleListingContainer");
        if (singleListingContainer) {
            singleListingContainer.innerHTML =
                "<p class='error text-center text-red-500'>Unable to load the listing. Please try again later.</p>";
        }
    }
}

try {
    runPage();
} catch (error) {
    console.error("An error occurred during page initialization:", error);
}