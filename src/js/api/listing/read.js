import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * Fetches a single auction listing by its ID from the query parameters.
 * Includes seller and bids information in the response.
 *
 * @async
 * @function readSingleListing
 * @throws {Error} If the ID is missing in the query parameters or if the fetch fails.
 * @returns {Promise<Object|null>} The listing object if successful, or null if the fetch fails.
 */

export async function readSingleListing() {

    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
        console.error("Error: No ID provided for fetching the listing.");
        throw new Error("Missing ID in query parameters.");
    }

    const params = new URLSearchParams({
        _seller: true,
        _bids: true,
    });

    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}/${id}?${params}`, {
            method: "GET",
             headers: headers(),
        }) 

        if (response.ok) {

            const data = await response.json();
            const listing = data.data
            return listing;
            
        }else {
            console.error(
                `Failed to fetch listing. Status: ${response.status} ${response.statusText}`
            );
            return null;
        }
    } catch (error) {
        console.error("An error occurred while fetching the listing:", error);
        throw error; // Propagate the error for further handling
    }
}

/**
 * Fetches auction listings from the API with optional pagination, sorting, and filtering by tag.
 *
 * @async
 * @param {number} [limit=12] - The maximum number of listings to fetch per page.
 * @param {number} [page=1] - The page number to fetch.
 * @param {string} [sort] - The field to sort the listings by.
 * @param {string} [sortOrder] - The order to sort the listings ('asc' or 'desc').
 * @param {string} [tag] - Optional tag to filter listings.
 * @returns {Promise<Array>} A promise that resolves to an array of listing objects.
 * @throws {Error} Throws an error if the fetch operation fails.
 */

export async function readListings(limit= 12, page = 1, sort, sortOrder, tag,) {
    try {
        const params = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
            sort,
            sortOrder,
            _seller: true,
            _bids: true,
        });

        if (tag) {
            params.append("tag", tag);
        }

        const url = `${API_AUCTION_LISTINGS}?${params.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: headers(),
        });

        if (!response.ok) {
            throw new Error (`Error! Didnt manage to fetch listings: ${response.status}`)
        }

        const data = await response.json();
        const listings = data.data
        return listings;

    } catch (error) {
        console.error("Error fetching Listings:", error);
        throw error;
    }
    
}