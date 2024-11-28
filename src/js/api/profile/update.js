import { API_AUCTION_PROFILES } from "../constants";
import { headers } from "../headers";

export async function updateProfile(name, { avatar, banner }) {
    if(!name) {
        throw new Error("Username is requiered to update the profile.");
    }

    const body = {
        avatar,
        banner,
    }

    try {
        const response = await fetch(`${API_AUCTION_PROFILES}/${name}`, {
            method: "PUT",
            headers: headers(),
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Failed to update profile. Status: ${response.status}`);
        }

        const updateProfile = await response.json();
        return updateProfile;
    } catch (error) {
        console.error("Error updating profile", error);
        return error; 
    }

}
