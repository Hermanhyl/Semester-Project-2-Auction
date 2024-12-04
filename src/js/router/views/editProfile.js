import { readProfile } from "../../api/profile/reade";
import { updateProfile } from "../../api/profile/update";


async function loadingProfile() {

    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const username = userInfo?.name;
        if (!username) {
            throw new Error("Username is not available");
        }

        const profile = await readProfile(username); // Fetch profile data

        if (profile) {
            const formUpdateProfile = document.forms["editForm"];
            if (formUpdateProfile) {
                formUpdateProfile.bannerImage.value = profile.banner?.url || "";
                formUpdateProfile.bannerAlt.value = profile.banner?.alt || "";
                formUpdateProfile.avatarImage.value = profile.avatar?.url || "";
                formUpdateProfile.avatarAlt.value = profile.avatar?.alt || "";
                formUpdateProfile.bio.value = profile.bio || "";
                console.log("Form fields updated with profile data");
            } else {
                console.error("Form 'editForm' not found in the DOM");
            }
        } else {
            console.error("No profile data returned from readProfile");
        }
    } catch (error) {
        console.error("An error occurred while loading the profile:", error);
        if (error.message.includes("Username")) {
            window.location.href = "/auth/login/";
    }
}
}

// Function to handle profile update submission
async function onUpdateProfile(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);

    const bannerUrl = formData.get("bannerImage");
    const bannerAlt = formData.get("bannerAlt");

    const avatarUrl = formData.get("avatarImage");
    const avatarAlt = formData.get("avatarAlt");

    const editInfo = {
        banner: bannerUrl || bannerAlt ? {url: bannerUrl, alt: bannerAlt} : null,
        avatar: avatarUrl || avatarAlt ? {url: avatarUrl, alt: avatarAlt} : null,
        bio: formData.get("bio"),
};

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const name = userInfo?.name
    if (!name) {
        console.error("Name is required for profile update");
        return;
    }

    try {
        const updatedProfile = await updateProfile(name, editInfo);
        console.log("Profile successfully updated:", updatedProfile);
    } catch (error) {
        console.error("Error during profile update:", error);
    }
}

// Attach event listener to the form
const formUpdateListing = document.forms["editForm"];
if (formUpdateListing) {
    formUpdateListing.addEventListener("submit", onUpdateProfile);
} else {
    console.error("Form 'editForm' not found in the DOM");
}

// Call the loadingProfile function to initialize the form
loadingProfile();