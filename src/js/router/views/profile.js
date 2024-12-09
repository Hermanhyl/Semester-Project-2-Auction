import { displayWins } from "../../api/profile/displayWins";
import { displayListings } from "../../api/profile/myListingDisplay";
import { readProfile, readProfiles, } from "../../api/profile/reade";

export const displayProfile = async () => {
    const profileContainer = document.getElementById("profileContainer");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    const username = userInfo.name
    
    const data = await readProfile(username); // The `readProfile` function now directly 

    const credits = document.createElement("p");
    credits.innerText = data.credits
   
    //console.log("loged in data is gathered", data);

    const container = document.createElement("div");
    // container.className = "profileContainer";

    // // Banner
    const banner = document.createElement("img");
    banner.className = "banner";
    banner.src = data.banner?.url || "default-banner.png"; // Fallback for missing banner
    banner.alt = data.banner?.alt || "User banner";

    // // Avatar
    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = data.avatar?.url || "default-avatar.png"; // Fallback for missing avatar
    avatar.alt = data.avatar?.alt || "User avatar";

    const editButton = document.createElement("button")
    editButton.innerText = "Edit Profile"
    editButton.className = "edit"
    editButton.addEventListener(`click`, () => {
        window.location.href = `/profile/edit/`
    })

    // Name
    const name = document.createElement("h1");
    name.innerText = data.name || "No name found";
    name.className = "userName";

    // Bio
    const bio = document.createElement("p");
    bio.innerText = data.bio || "No bio provided.";
    bio.className = "userBio";

    // Append elements to the container
    container.append(banner, avatar, editButton, credits, name, bio);

    // Append the container to the profileContainer
    profileContainer.appendChild(container);
};

async function runProfile() {
    await displayProfile();
}

runProfile()


// DISPLAY FUNCTION FOR WON AUCTIONS


async function runWins() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo.name) {
            throw new Error("User information is not available in localStorage.");
        }

        const profileData = await readProfile(userInfo.name);
        displayWins(profileData);
    } catch (error) {
        console.error("Error in runWins:", error);
        const winsContainer = document.getElementById("winsContainer");
        const errorMessage = document.createElement("p");
        errorMessage.innerText = "An error occurred while loading wins.";
        winsContainer.appendChild(errorMessage);
    }
}

runWins();


// Display curren


// DISPLAY MY LISTINGS HERE...



async function runListings() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo.name) {
            throw new Error("User information is not available in localStorage.");
        }

        // Fetch profile data
        const profileData = await readProfile(userInfo.name);

        // Pass the data to displayListings
        displayListings(profileData);
    } catch (error) {
        console.error("Error in runListings:", error);

        const listingsContainer = document.getElementById("listingsContainer");
        const errorMessage = document.createElement("p");
        errorMessage.innerText = "An error occurred while loading listings.";
        listingsContainer.appendChild(errorMessage);
    }
}

runListings();