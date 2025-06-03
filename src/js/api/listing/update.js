import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";


/**
 * Updates an auction listing with the provided details.
 *
 * @async
 * @function updateListing
 * @param {string} id - The ID of the listing to update. (Note: This parameter is overwritten by the 'id' from the URL query string.)
 * @param {Object} params - The listing details to update.
 * @param {string} params.title - The new title of the listing.
 * @param {string} params.description - The new description of the listing.
 * @param {string} params.endsAt - The new end date/time for the listing.
 * @param {Array<string>} params.tags - The updated tags for the listing.
 * @param {Array<string>} params.media - The updated media URLs for the listing.
 * @returns {Promise<Object|undefined>} The updated listing data if successful, otherwise undefined.
 */

export async function updateListing(id, { title, description, endsAt, tags, media }) {
    if (!id) {
        id = new URLSearchParams(window.location.search).get("id");
    }

    if (!id) {
        console.error("No listing ID provided.");
        alert("Listing ID is missing. Cannot update.");
        return;
    }

    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
            method: "PUT",
            headers: headers(),
            body: JSON.stringify({ title, description, endsAt, tags, media }),
        });

        if (!response.ok) {
            alert("Failed to update the listing. Are you sure you are the owner?");
            const errorData = await response.json();
            console.error("Update error:", errorData);
        } else {
            alert("Post successfully updated.");
            const data = await response.json();
            return data;
        }

    } catch (error) {
        console.error("Failed to update the listing:", error);
        alert("An error occurred while updating. Please try again.");
    }
}