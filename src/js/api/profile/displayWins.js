export const displayWins = (profileData) => {
    const winsContainer = document.getElementById("winsContainer");
    winsContainer.innerHTML = ""; // Clear previous content

    if (!profileData?.wins || profileData.wins.length === 0) {
        const noWinsMessage = document.createElement("p");
        noWinsMessage.innerText = "No wins to display...";
        noWinsMessage.className = "text-gray-500 text-center mt-4";
        winsContainer.appendChild(noWinsMessage);
        return;
    }

    const container = document.createElement("div");
    container.className = "winsContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20";

    const heading = document.createElement("h2");
    heading.innerText = "Auctions Won";
    heading.className = "text-2xl font-bold text-black mb-6 ml-20";
    winsContainer.appendChild(heading);

    profileData.wins.forEach((win) => {
        const winContainer = document.createElement("div");
        winContainer.className = "flex flex-col winItem bg-white shadow-md rounded-lg p-4 space-y-4 transform transition duration-300 hover:scale-105";

        const image = document.createElement("img");
        image.className = "listingImage rounded-lg object-cover w-full h-48";
        image.src = win.media?.[0]?.url || "default-image.png";
        image.alt = win.media?.[0]?.alt || "Listing image";

        const title = document.createElement("h3");
        title.innerText = win.title || "No Title";
        title.className = "winTitle text-lg font-bold text-gray-800";

        const description = document.createElement("p");
        description.innerText = win.description || "No Description";
        description.className = "winDescription text-gray-600 text-sm";

        const sellerName = document.createElement("h2");
        sellerName.innerText = win.seller?.name || "Unknown Seller";
        sellerName.className = "sellerName text-black font-bold mb-2 mt-2";

        const viewButton = document.createElement("button");
        viewButton.innerText = "View Listing";
        viewButton.className = "viewButton bg-[#B11125] text-white py-2 px-4 rounded-lg hover:bg-red-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-accentRed";

        viewButton.addEventListener("click", () => {
            window.location.href = `/post/?id=${win.id}`;
        });

        winContainer.append(image, sellerName, title, description, viewButton);
        container.appendChild(winContainer);
    });

    winsContainer.appendChild(container);
};
