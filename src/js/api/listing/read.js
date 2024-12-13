import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

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