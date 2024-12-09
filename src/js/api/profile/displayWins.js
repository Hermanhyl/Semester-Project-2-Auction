export const displayWins = (profileData) => {
    const winsContainer = document.getElementById("winsContainer");

    if (!profileData || !profileData.wins || profileData.wins.length === 0) {
        const noWinsMessage = document.createElement("p");
        noWinsMessage.innerText = "No wins to display...";
        winsContainer.appendChild(noWinsMessage);
        return;
    }

    const container = document.createElement("div");
    container.className = "winsContainer";

    const heading = document.createElement("h2");
    heading.innerText = "Wins";

    container.appendChild(heading);

    profileData.wins.forEach((win) => {
        const winContainer = document.createElement("div");
        winContainer.className = "winItem mb-4";

        const image = document.createElement("img");
        image.className = "listingImage pt-5"

        if (Array.isArray(win.media) && win.media.length > 0) {
            const mediaItem = win.media[0];
            if (mediaItem.url) {
                image.src = mediaItem.url;
                image.alt = mediaItem.alt || "Listing image"; 
            }
        }

        const title = document.createElement("h3");
        title.innerText = win.title || "No Title";
        title.className = "winTitle";

        const description = document.createElement("p");
        description.innerText = win.description || "No Description";
        description.className = "winDescription";

        const sellerName = document.createElement("p");
        sellerName.innerText = `Seller: ${win.seller?.name || "Unknown Seller"}`;
        sellerName.className = "sellerName mb-2 mt-2";

        const viewButton = document.createElement("button");
        viewButton.innerText = "View Listing";
        viewButton.className = "viewButton";

        viewButton.addEventListener('click', () => {
            window.location.href = `/post/?id=${win.id}`;
            localStorage.setItem("listingId", JSON.stringify(win.id));
        });

        winContainer.append(image, title, description, sellerName, viewButton);
        container.appendChild(winContainer);
    });

    winsContainer.appendChild(container);
};