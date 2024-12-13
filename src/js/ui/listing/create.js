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

    console.log("Payload being sent:", createData);

    try {
        const result = await onCreateListing(
            createData.title,
            createData.description,
            createData.endsAt,
            createData.tags,
            createData.media
        );

        if (result) {
            console.log("Listing created successfully:", result);
        } else {
            console.error("Failed to create listing. Please check your input.");
        }
    } catch (error) {
        console.error("Error during listing creation:", error);
    }
}

