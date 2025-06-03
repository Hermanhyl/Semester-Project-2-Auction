import { createListing } from "../../api/listing/create";

/**
 * Handles the creation of a new listing from a form submission event.
 *
 * Extracts form data, constructs the listing object, and calls the `createListing` API.
 * Handles success and error cases with user feedback and navigation.
 *
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 */

export async function onCreateListing(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const media = [];
    for (let i = 1; i <= 3; i++) {
        const url = formData.get(`image${i}`);
        const alt = formData.get(`alt${i}`);
        if (url) {
            media.push({ url, alt: alt || "" });
        }
    }

    const createData = {
        title: formData.get("title"),
        description: formData.get("body"),
        endsAt: new Date(formData.get("endsAt")).toISOString(),
        tags: formData.get("tags")
            ? formData.get("tags").split(',').map(tag => tag.trim())
            : [],
        media
    };

    try {
        const result = await createListing(
            createData.title,
            createData.description,
            createData.endsAt,
            createData.tags,
            createData.media
        );

        if (result) {
            console.log("Listing created successfully:", result);
            alert("Listing successfully created!");
            window.location.href = "/";
        } else {
            console.error("Failed to create listing. Please check your input.");
            alert("Failed to create listing. Please check your input.");
        }
    } catch (error) {
        console.error("Error during listing creation:", error);
        alert("An error occurred while creating the listing. Please try again.");
    }
}

