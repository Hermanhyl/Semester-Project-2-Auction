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
    console.log("listings", listings);

    if (!listingContainer) {
        console.error("No container with id `listingContainer` found");
        return;
    }

    listings.forEach(listing => {
        const container = document.createElement("div");
        container.className = "listingContainer";

        const image = document.createElement("img");
        image.className = "listingImage pt-5"

        if (Array.isArray(listing.media) && listing.media.length > 0) {
            const mediaItem = listing.media[0];
            if (mediaItem.url) {
                image.src = mediaItem.url;
                image.alt = mediaItem.alt || "Listing image"; 
            }
        }

        const sellerName = document.createElement("p");
        sellerName.innerText =  listing.seller?.name || "Unknown Seller";
        sellerName.className = "listingName mb-2 mt-2";

        const title = document.createElement("h2");
        title.innerText = listing.title;
        title.className = "listingTitle";

        const description = document.createElement("p");
        description.innerText = listing.description;
        description.className = "listingDescription"

        const currentBid = document.createElement("p");
        currentBid.className = "currentBid";
        if (listing.bids && Array.isArray(listing.bids) && listing.bids.length > 0) {
            const highestBid = Math.max(...listing.bids.map(bid => bid.amount));
            currentBid.innerText = `Current Bid: ${highestBid}`;
        } else {
            currentBid.innerText = "No Bids Yet";
        }

        // Create the bid form
        const bidForm = document.createElement("form");
        bidForm.className = "bidForm";

        const bidInput = document.createElement("input");
        bidInput.name = "bidInput";
        bidInput.type = "number";
        bidInput.placeholder = "0.00";
        bidInput.min = "0";
        bidInput.className = "bidInput";

        // Create the submit button
        const bidButton = document.createElement("button");
        bidButton.type = "submit";
        bidButton.innerText = "Place Bid";
        bidButton.className = "bidButton";

        // Append input and button to the form
        bidForm.appendChild(bidInput);
        bidForm.appendChild(bidButton);

        // Handle form submission
        bidForm.addEventListener("submit",(event) => onBid(event, listing.id) );

        const openModal = document.getElementById("biddersModal");

        const viewBiddersButton = document.createElement("button");
        viewBiddersButton.innerText = "View Bidders";
        viewBiddersButton.id = "viewBidsButton"
        viewBiddersButton.className = "viewBiddersButton";
        viewBiddersButton.addEventListener("click", () => {
            console.log("View Bidders button clicked for listing ID:", listing.id);
            openModal.classList.add("flex")
            showBidders(listing.id);
        });

        const viewButton = document.createElement("button");
        viewButton.innerText = "View Listing";
        viewButton.className = "viewButton";

        viewButton.addEventListener('click', () => {
            window.location.href = `/post/?id=${listing.id}`;
            localStorage.setItem("listingId", JSON.stringify(listing.id));
        });


        container.append(image, sellerName, title, description, currentBid, bidForm, viewBiddersButton, viewButton);
        listingContainer.appendChild(container);
    });

    initializeModalListeners();
};
