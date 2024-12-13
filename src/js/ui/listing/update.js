import { updateListing } from "../../api/listing/update";

export async function onUpdateListing(event, postId) {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Create an array of media from the form data
    const media = [];
    for (let i = 1; i <= 3; i++) {
        const url = formData.get(`image${i}`);
        const alt = formData.get(`alt${i}`);
        if (url) {
            media.push({ url, alt: alt || "" }); // Add only if a URL is provided
        }
    }

    const editInfo = {
        title: formData.get("title"),
        description: formData.get("body"),
        endsAt: new Date(formData.get("endsAt")).toISOString(),
        tags: formData.get("tags")
            ? formData.get("tags").split(",").map(tag => tag.trim())
            : [],
        media, // Updated media array
    };

    // Call the API to update the listing
    await updateListing(postId, editInfo);
}