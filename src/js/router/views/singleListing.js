import { readSingleListing } from "../../api/Listing/read";

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

    const editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButton.addEventListener("click", () => {
        window.location.href = `../post/edit/?id=${listing.id}`
        localStorage.setItem("listingId", JSON.stringify(listing.id))
    })

    
    container.append( image, nextButton, prevButton, sellerName, title, description, editButton);
    singleListingContainer.appendChild(container);
};

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
