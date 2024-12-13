import { onBid, showBidders } from "../../ui/listing/bid";

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

        const endsAt = document.createElement("h4")
        endsAt.innerText = listing.endsAt
        endsAt.className = "endsAt mt-2"

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
        bidInput.className = "bidInput text-black p-2 border border-gray-300       rounded-md focus:outline-none focus:ring-2 focus:ring-accentRed";

        const bidButton = document.createElement("button");
        bidButton.type = "submit";
        bidButton.innerText = "Place Bid";
        bidButton.className = "bidButton bg-[#B11125] text-white py-2 px-4     rounded-md hover:bg-red-400 focus:outline-none focus:ring-2    focus:ring-accentRed";

        bidForm.appendChild(bidInput);
        bidForm.appendChild(bidButton);

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
                console.log("View Bidders button clicked for listing ID:", listing.id);
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