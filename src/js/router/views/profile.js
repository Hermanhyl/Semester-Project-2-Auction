import { displayWins } from "../../api/profile/displayWins";
import { displayMyListings } from "../../api/profile/myListingDisplay";
import { readProfile, readProfileWins } from "../../api/profile/read";
import { authGuard } from "../../utilitis/authGuard.js";


export const displayProfile = async () => {
    const profileContainer = document.getElementById("profileContainer");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const username = userInfo.name;

    const data = await readProfile(username);

    const container = document.createElement("div");
    container.className = "p-6 space-y-6";

    
    const bannerContainer = document.createElement("div");
    bannerContainer.className = "relative";

    const banner = document.createElement("img");
    banner.className = "banner w-full max-h-72 object-cover rounded-lg";
    banner.src = data.banner?.url || "default-banner.png";
    banner.alt = data.banner?.alt || "User banner";

    const avatarContainer = document.createElement("div");
    avatarContainer.className = "absolute left-1/4 sm:left-1/3 transform -translate-x-1/2 mt-[-50px]";

    const avatar = document.createElement("img");
    avatar.className = "avatar border-4 border-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover";
    avatar.src = data.avatar?.url || "default-avatar.png";
    avatar.alt = data.avatar?.alt || "User avatar";

    avatarContainer.appendChild(avatar);
    bannerContainer.append(banner, avatarContainer);

    
    const infoContainer = document.createElement("div");
    infoContainer.className = "space-y-4 mt-6 shadow-md p-2 pb-5 rounded-lg" ;

    
    const editButtonContainer = document.createElement("div");
    editButtonContainer.className = "flex justify-end";

    const editButton = document.createElement("button");
    editButton.innerText = "Edit Profile";
    editButton.className = "edit bg-[#B11125] text-white py-2 px-6 rounded-md hover:bg-red-400 focus:outline-none hover:text-black focus:ring-2 focus:ring-accentRed";
    editButton.addEventListener("click", () => {
        window.location.href = "/profile/edit/";
    });

    editButtonContainer.appendChild(editButton);

    
    const nameAndBioContainer = document.createElement("div");
    nameAndBioContainer.className = "text-center space-y-2";

    const name = document.createElement("h1");
    name.innerText = data.name || "No name found";
    name.className = "text-2xl text-black font-bold text-center";

    const bio = document.createElement("p");
    bio.innerText = data.bio || "No bio provided.";
    bio.className = "text-center text-gray-500 mb-5";

    const credits = document.createElement("p");
    credits.innerText = `Credits: ${data.credits}`;
    credits.className = "text-center text-lg font-medium text-gray-600";

    nameAndBioContainer.append(name, credits, bio);

    infoContainer.append(editButtonContainer, nameAndBioContainer);

    container.append(bannerContainer, infoContainer);

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

        const profileData = await readProfileWins(userInfo.name);
        
        displayWins({ wins: profileData });
    } catch (error) {
        console.error("Error in runWins:", error);

        const winsContainer = document.getElementById("winsContainer"); 
        winsContainer.innerHTML = ""; 
        const errorMessage = document.createElement("p");
        errorMessage.innerText = "An error occurred while loading wins.";
        errorMessage.className = "text-red-500 text-center";
        winsContainer.appendChild(errorMessage);
    }
}
runWins();


// DISPLAY MY LISTINGS HERE...
async function runListings() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo.name) {
            throw new Error("User information is not available in localStorage.");
        }

        const profileData = await readProfile(userInfo.name);

        displayMyListings(profileData);
    } catch (error) {
        console.error("Error in runListings:", error);

        const listingsContainer = document.getElementById("listingsContainer");
        const errorMessage = document.createElement("p");
        errorMessage.innerText = "An error occurred while loading listings.";
        listingsContainer.appendChild(errorMessage);
    }
}

runListings();

authGuard()