import { displayListings } from "../../api/Listing/displayListings";
import { readListings } from "../../api/Listing/read";
import { authGuard } from "../../utilitis/authGuard";


let currentPage = 1; // Start with page 1
const listingsPerPage = 12; // Number of listings per page

async function runPage(page = 1) {
    try {
        const listings = await readListings(listingsPerPage, page, "created", "desc");
        const listingContainer = document.getElementById("listingContainer");
        listingContainer.innerHTML = ""; // Clear the previous listings
        displayListings(listings, "userName"); // Replace with the actual user name
        updatePaginationControls(page); 
    } catch (error) {
        console.error("Error loading page:", error);
    }
}

runPage()

authGuard()

function updatePaginationControls(page) {
    const totalListings = 100; // Replace this with the total count from the API if available
    const totalPages = Math.ceil(totalListings / listingsPerPage);

    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    const currentPageDisplay = document.getElementById("currentPage");

    // Update button states
    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= totalPages;

    // Update current page display
    currentPageDisplay.innerText = `Page ${page} of ${totalPages}`;
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        runPage(currentPage);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    runPage(currentPage);
});