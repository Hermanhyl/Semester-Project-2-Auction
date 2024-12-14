import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";


export async function updateListing(id, {title, description, endsAt, tags, media}) {
    id = new URLSearchParams(window.location.search).get('id');

    try { 
        const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
            method: "PUT",
            headers: headers(),
            body: JSON.stringify({title, description, endsAt, tags, media})
        });

        if (!response.ok) {
            alert("Failed to update listing, sure this is your listing?")
        } else {
            alert("Post successfully updatet")
            const data = await response.json();
            return data;
        }
        
    } catch (error) {
        console.error("Failed to update the listing", error)
    }
}