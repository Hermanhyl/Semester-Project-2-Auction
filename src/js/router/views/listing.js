import { readSingleListing } from "../../api/Listing/read";

export const displaySingleListing = (listing) => {
    const listingContainer = document.getElementById("listingContainer");

    if (!listingContainer) {
        console.error("No container with id `listingContainer` found.");
        return;
    }

    const container = document.createElement("div");
    container.className = "listingContainer"

    const title = document.createElement("h2")
    title.innerText = listing.title
    title.className = "listingTitle"

    const description = document.createElement("p")
    description.innerText = listing.description
    description.className = "listingDescription"

    const image = document.createElement("img")
    image.className = "listingImage"

    container.append(image, title, description,);
    listingContainer.appendChild(container);

}

async function runPage() {
    const listing = await readSingleListing()
    displaySingleListing(listing)
}

runPage()