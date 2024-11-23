

export const displayListings = (listings, userName) => {
    const listingContainer = document.getElementById("listingContainer");

    if (!listingContainer) {
        console.error("No container with id `pastcontainer` found");
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
        sellerName.innerText = listing.seller?.name || "Unknown Seller";
        sellerName.className = "postAuthor mb-2 mt-2";

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

        const bidInput = document.createElement('input');
        bidInput.type = 'number';
        bidInput.placeholder = '0.00';
        bidInput.min = `0`
        bidInput.className = 'bidInput';

        const viewButton = document.createElement("button")
        viewButton.innerText = "view"
        viewButton.className = "viewButton"
        viewButton.addEventListener('click', () => {
            window.location.href = "post/index.html"
        });

        const bidButton = document.createElement('button');
        bidButton.innerText = "Place Bid";
        bidButton.className = "bidButton";
        bidButton.addEventListener('click', () => {
            const bidValue = parseFloat(bidInput.value);
            if (isNaN(bidValue) || bidValue <= 0) {
                alert("Please enter a valid bid amount.");
            } else {
                console.log(`User ${userName} placed a bid of $${bidValue.toFixed(2)} on ${listing.title}`);
                // Logic to handle bid submission (e.g., API call) would go here.
            }
        });
  

        container.append(image, sellerName, title, description,  currentBid, bidInput, viewButton, bidButton);
        listingContainer.appendChild(container);

    });
}