export const displayListings = (profileData) => {
    const listingsContainer = document.getElementById("listingsContainer");

    console.log("her", profileData);
    

    if (!profileData || !profileData.listings || profileData.listings.length === 0) {
        const noListingsMessage = document.createElement("p");
        noListingsMessage.innerText = "No Listings to display...";
        listingsContainer.appendChild(noListingsMessage);
        return;
    }

    const container = document.createElement("div");
    container.className = "listingsContainer";

    const heading = document.createElement("h2");
    heading.innerText = "My Listings";

    container.appendChild(heading);

    profileData.listings.forEach((listing) => {
        const listingsContainer = document.createElement("div");
        listingsContainer.className = "listingItem mb-4";

        const image = document.createElement("img");
        image.className = "listingImage pt-5"

        if (Array.isArray(listing.media) && listing.media.length > 0) {
            const mediaItem = listing.media[0];
            if (mediaItem.url) {
                image.src = mediaItem.url;
                image.alt = mediaItem.alt || "Listing image"; 
            }
        }
        
        const title = document.createElement("h3");
        title.innerText = listing.title || "No Title";
        title.className = "listingTitle";

        const description = document.createElement("p");
        description.innerText = listing.description || "No Description";
        description.className = "listingDescription";

        const viewButton = document.createElement("button")
        viewButton.innerText = "view"
        viewButton.className = "viewButton"

        viewButton.addEventListener('click', () => {
            window.location.href = `/post/?id=${listing.id}`;
            localStorage.setItem("listingId", JSON.stringify(listing.id))
        });

        listingsContainer.append( heading, image, title, description, viewButton);
        container.appendChild(listingsContainer);
    });

    listingsContainer.appendChild(container);
};