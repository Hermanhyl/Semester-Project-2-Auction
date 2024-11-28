
import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers"

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