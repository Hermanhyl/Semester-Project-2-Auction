import { API_AUCTION_LISTINGS, API_AUCTION_PROFILES } from "../constants";
import { headers } from "../headers";


export async function readProfile(name) {
    if (!name) {
        throw new Error("Username is needed to fetch the profile.");
    }

    const params = new URLSearchParams({
        _listings: true,
        _wins: true,
    });

    try {
        const response = await fetch(`${API_AUCTION_PROFILES}/${name}?${params}`, {
            method: "GET",
            headers: headers(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch profile. Status: ${response.status}`);
        }

        const data = await response.json();
        const profile = data.data;
        return profile; // Return the complete response

    } catch (error) {
        console.error("Error while fetching profile:", error);
        throw error;
    }
}

export async function readProfiles(name) {
    try {

        const url = (`${API_AUCTION_PROFILES}?${name}/bids`);

        const response = await fetch(url, {
            method: "GET",
            headers: headers(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch profiles. Status: ${response.status}`);
        }

        const data = await response.json();
        const listings = data.data
        return listings;

    } catch (error) {
        console.error("Error fetching profiles:", error);
        throw error;
    }
}

export async function searchListings(query) {
    const params = new URLSearchParams({
        q: query, 
        _seller: true,
        _bids: true,
    });

    const url = `${API_AUCTION_LISTINGS}/search?${params}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch profiles. Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data
    } catch (error) {
        console.error("Error fetching profiles:", error);
        throw error;
    }
}