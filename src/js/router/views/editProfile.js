import { readProfile } from "../../api/profile/read";
import { updateProfile } from "../../api/profile/update";


/**
 * Loads the user's profile information and populates the edit profile form fields.
 * 
 * Retrieves the current user's information from localStorage, fetches the profile data,
 * and updates the form fields with the profile details. If the user is not logged in or
 * the username is unavailable, redirects to the login page. Handles errors and logs them to the console.
 * 
 * @async
 * @function loadingProfile
 * @returns {Promise<void>} Resolves when the profile is loaded and form is populated.
 */

async function loadingProfile() {

    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const username = userInfo?.name;
        if (!username) {
            throw new Error("Username is not available");
        }

        const profile = await readProfile(username); 

        if (profile) {
            const formUpdateProfile = document.forms["editForm"];
            if (formUpdateProfile) {
                formUpdateProfile.bannerImage.value = profile.banner?.url || "";
                formUpdateProfile.bannerAlt.value = profile.banner?.alt || "";
                formUpdateProfile.avatarImage.value = profile.avatar?.url || "";
                formUpdateProfile.avatarAlt.value = profile.avatar?.alt || "";
                formUpdateProfile.bio.value = profile.bio || "";
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

/**
 * Handles the profile update form submission event.
 * Prevents the default form submission, gathers form data,
 * constructs the profile update payload, and calls the updateProfile API.
 * Redirects to the profile page upon success.
 *
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 */

async function onUpdateProfile(event) {
    event.preventDefault(); 

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
        window.location.href = "/profile/";
    } catch (error) {
        console.error("Error during profile update:", error);
    }
}


const formUpdateListing = document.forms["editForm"];
if (formUpdateListing) {
    formUpdateListing.addEventListener("submit", onUpdateProfile);
} else {
    console.error("Form 'editForm' not found in the DOM");
}


loadingProfile();
