import { displayListings } from "../../api/listing/displayListings";
import { readListings } from "../../api/listing/read";
import { searchHandel } from "../../utilitis/search";


let currentPage = 1;
const listingsPerPage = 12; 

/**
 * Loads and displays a page of listings, handling pagination and errors.
 *
 * @async
 * @function runPage
 * @param {number} [page=1] - The current page number to display.
 * @param {Array<Object>} [listings=null] - Optional pre-fetched listings to display. If not provided, listings will be fetched.
 * @returns {Promise<void>} Resolves when the page has been loaded and displayed.
 */

export async function runPage(page = 1, listings = null) {
    try {
        const listingContainer = document.getElementById("listingContainer");
        listingContainer.innerHTML = "";

        if (!listings) {
            listings = await readListings(listingsPerPage, page, "created", "desc");
        }

        displayListings(listings, "userName"); 
        updatePaginationControls(page);
    } catch (error) {
        console.error("Error loading page:", error);
    }
}

runPage();

/**
 * Updates the pagination controls (previous/next buttons and current page display)
 * based on the current page number.
 *
 * @param {number} page - The current page number to display and use for enabling/disabling controls.
 */

function updatePaginationControls(page) {
    const totalListings = 100; 
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

async function runSearch() {
    await searchHandel();
}

runSearch()
