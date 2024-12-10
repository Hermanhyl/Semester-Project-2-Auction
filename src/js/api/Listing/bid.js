import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

export const fetchBid = async (amount, id) => {
    
    if (!id) {
        throw new Error("Listing ID is required to fetch bid details.");
    }

    // Prepare the request body
    const body = {
        amount: amount,
    };
    console.log(body);
    
    try {
        // Make the POST request to the API
        const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(body)
        });

        console.log('response', response);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to place bid. Status: ${response.status}`);
        }

        // Parse and return the response data
        const data = await response.json();
        return data; // Return the response data

    } catch (error) {
        console.error("Error making API call:", error);
        throw error;
    }
};

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
        console.log("data", data);
        return data.data.bids || []; // Return bids array

    } catch (error) {
        console.error("Error fetching bidders:", error);
        return [];
    }
};