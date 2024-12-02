import { API_AUCTION_PROFILES } from "../constants";
import { headers } from "../headers";

export async function readProfile(name) {
    if (!name) {
        throw new Error("Username is needed to fetch the profile.");
    }

    try {
        const response = await fetch(`${API_AUCTION_PROFILES}/${name}`, {
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

export async function readProfiles(limit = 10, page = 1) {
    try {
        // Build the query parameters
        const params = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
        });

        const url = `${API_AUCTION_PROFILES}?${params.toString()}`;

        // Fetch the list of profiles
        const response = await fetch(url, {
            method: "GET",
            headers: headers(),
        });

        // Check for response status
        if (!response.ok) {
            throw new Error(`Failed to fetch profiles. Status: ${response.status}`);
        }

        // Parse and return the list of profiles
        const profiles = await response.json();
        return profiles;
    } catch (error) {
        console.error("Error fetching profiles:", error);
        throw error;
    }
}