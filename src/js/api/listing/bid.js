import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

// Fix

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