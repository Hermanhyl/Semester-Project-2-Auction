import { readSingleListing } from "../../api/Listing/read";
import { onUpdateListing } from "../../ui/listing/update";
import { authGuard } from "../../utilitis/authGuard";

const listingId = new URLSearchParams(window.location.search).get("id");

async function loadListing() {
    try {
        const listing = await readSingleListing(listingId);

        if (listing) {
            // Populate form fields with data from the listing
            formUpdateListing.title.value = listing.title || "";
            formUpdateListing.body.value = listing.description || ""; 
            formUpdateListing.endsAt.value = formatDateForInput(listing.endsAt) || "";
            formUpdateListing.tags.value = listing.tags?.join(", ") || "";

            // Populate image and alt fields (up to 3 images)
            for (let i = 0; i < 3; i++) {
                const imageField = formUpdateListing[`image${i + 1}`];
                const altField = formUpdateListing[`alt${i + 1}`];

                if (imageField && altField) {
                    imageField.value = listing.media?.[i]?.url || "";
                    altField.value = listing.media?.[i]?.alt || "";
                }
            }
        } else {
            console.error("Listing not found");
        }
    } catch (error) {
        console.error("Error loading listing:", error);
    }
}

/**
 * Formats an ISO date string to match the `datetime-local` input format.
 * @param {string} isoDate - ISO date string (e.g., "2024-11-26T13:29:00.000Z").
 * @returns {string} - Formatted date string (e.g., "2024-11-26T13:29").
 */
function formatDateForInput(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const formUpdateListing = document.forms["updateListing"];
formUpdateListing.addEventListener("submit", (event) => onUpdateListing(event, listingId));

loadListing();
authGuard();
