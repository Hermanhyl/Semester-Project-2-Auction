import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";


/**
 * Places a bid on a specific auction listing.
 *
 * @async
 * @function fetchBid
 * @param {number} amount - The amount to bid.
 * @param {string} id - The ID of the listing to place a bid on.
 * @returns {Promise<Object>} The response data from the API after placing the bid.
 * @throws {Error} If the listing ID is not provided or the API call fails.
 */

export const fetchBid = async (amount, id) => {
    
    if (!id) {
        throw new Error("Listing ID is required to fetch bid details.");
    }

    const body = {
        amount: amount,
    };
    
    
    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            throw new Error(`Failed to place bid. Status: ${response.status}`);
        }

        
        const data = await response.json();
        return data; 

    } catch (error) {
        console.error("Error making API call:", error);
        throw error;
    }
};

/**
 * Fetches the list of bidders for a specific auction listing by name.
 *
 * @async
 * @function fetchBidders
 * @param {string} name - The name or identifier of the auction listing.
 * @returns {Promise<Array>} A promise that resolves to an array of bids for the specified listing.
 * If an error occurs, an empty array is returned.
 */

export const fetchBidders = async (name) => {
    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}/${name}?_bids=true`, {
            method: "GET",
            headers: headers(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch bidders. Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data.bids || []; 

    } catch (error) {
        console.error("Error fetching bidders:", error);
        return [];
    }
};