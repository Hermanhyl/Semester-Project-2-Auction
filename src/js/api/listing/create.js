
import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers"

/**
 * Creates a new auction listing by sending a POST request to the API.
 *
 * @async
 * @function
 * @param {string} title - The title of the listing.
 * @param {string} description - The description of the listing.
 * @param {string} endsAt - The end date and time for the listing (ISO 8601 format).
 * @param {string[]} tags - An array of tags associated with the listing.
 * @param {string[]} media - An array of media URLs for the listing.
 * @returns {Promise<Object|undefined>} The created listing data if successful, otherwise undefined.
 */

export async function createListing(title, description, endsAt, tags, media) {
    
    const body = {
        title,
        description,
        endsAt,
        tags,
        media
    };

    try {
        const response = await fetch(API_AUCTION_LISTINGS, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            return data;             
        }
        
    } catch (error) {
        console.error("Something went wrong while creating a listing:", error);
    }
}