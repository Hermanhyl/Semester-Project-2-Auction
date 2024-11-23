import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

export async function readSingleListing() {
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
        console.error("Error: No ID found in the query parameters.");
        return null;
    }

    const params = new URLSearchParams({
        _seller: true,
        _bids: true,
        _tag: true,
        _active: true,
    });

    try { 
        const response = await fetch(`${API_AUCTION_LISTINGS}/${id}?${params.toString()}`, {
            method: "GET",
            headers: headers()
        }); 

        if (response.ok) {
            const data = await response.json()
            const listing = data.data
            return listing;
        } else {
            console.error("Failed to find single post:", response.status, response.statusText);
            return null;
        }    
    } catch (error) {
        console.error("An error has occurred while fetching the listing", error);
        return null;
    }
}

export async function readListings(limit= 12, page = 1, tag) {
    try {
        const params = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
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