import { readSingleListing } from "../../api/Listing/read";
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

export const displaySingleListing = (listing) => {
    const singleListingContainer = document.getElementById("singleListingContainer");

    if (!singleListingContainer) {
        console.error("No container with id `singleListingContainer` found.");
        return;
    }

    const image = document.createElement("img");
    image.className = "listingImage";

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
    }

    updateImage();

    const nextButton = document.createElement("button")
    nextButton.innerText = "Next"
    nextButton.className = "nexstButton"
    nextButton.addEventListener("click", () => {
        currentImage = (currentImage + 1) % listing.media.length;
        updateImage();
    });

    const prevButton = document.createElement("button");
    prevButton.innerText = "Prev";
    prevButton.className = "prevButton";
    prevButton.addEventListener("click", () => {
    currentImage = (currentImage - 1 + listing.media.length) % listing.media.length;
    updateImage();
});
    
    const container = document.createElement("div");
    container.className = "listingContainer";

    const sellerName = document.createElement("h2")
    sellerName.innerText = listing.seller?.name
    sellerName.className = "sellerName"

    const title = document.createElement("h3");
    title.innerText = listing.title;
    title.className = "listingTitle";

    const description = document.createElement("p");
    description.innerText = listing.description;
    description.className = "listingDescription";

    const currentBid = document.createElement("p");
        currentBid.className = "currentBid";
        if (listing.bids && Array.isArray(listing.bids) && listing.bids.length > 0) {
            const highestBid = Math.max(...listing.bids.map(bid => bid.amount));
            currentBid.innerText = `Current Bid: ${highestBid}`;
        } else {
            currentBid.innerText = "No Bids Yet";
        }

    // View bidders HERE!!!

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

    const editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButton.addEventListener("click", () => {
        window.location.href = `../post/edit/?id=${listing.id}`
        localStorage.setItem("listingId", JSON.stringify(listing.id))
    })

    
    container.append( image, prevButton, nextButton, sellerName, title, description, currentBid, bidForm, viewBiddersButton, editButton);
    singleListingContainer.appendChild(container);
};

initializeModalListeners();

async function runPage() {
    try {
        // Fetch and display the listing
        const listing = await readSingleListing();
        displaySingleListing(listing);
    } catch (error) {
        console.error("Failed to load the listing:", error);
        const singleListingContainer = document.getElementById("singleListingContainer");
        if (singleListingContainer) {
            singleListingContainer.innerHTML =
                "<p class='error'>Unable to load the listing. Please try again later.</p>";
        }
    }
}

try {
    runPage();
} catch (error) {
    console.error("An error occurred during page initialization:", error);
}
