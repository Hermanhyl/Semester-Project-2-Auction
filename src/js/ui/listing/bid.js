import { fetchBid, fetchBidders } from "../../api/listing/bid";


/**
 * Handles the bid submission event for a listing.
 *
 * @async
 * @function
 * @param {Event} event - The form submission event triggered by the user.
 * @param {string|number} id - The unique identifier of the listing to place a bid on.
 * @returns {Promise<void>} Resolves when the bid has been processed.
 */
export const onBid = async (event, id) => {
    event.preventDefault();

    const formData = new FormData(event.target); 
    const amount = Number(formData.get("bidInput"));

    if (!amount || amount <= 0) {
        console.error("Invalid bid amount");
        return; 
    }

    await fetchBid(amount, id); 
        
};

/**
 * Displays the list of bidders for a given auction item in a modal.
 *
 * Fetches the bidders using the provided item ID, updates the modal with the list of bidders and their bid amounts,
 * and shows the modal. If there are no bids, displays a message indicating so.
 *
 * @async
 * @param {string|number} id - The unique identifier of the auction item to fetch bidders for.
 * @returns {Promise<void>} Resolves when the bidders have been fetched and displayed.
 */
export const showBidders = async (id) => {
    const modal = document.getElementById("biddersModal");
    const biddersList = document.getElementById("biddersList");

    biddersList.innerHTML = "";

    
        const bidders = await fetchBidders(id);

        if (bidders.length === 0) {
            biddersList.innerHTML = "<p>No bids yet.</p>";
        } else {
            bidders.forEach((bid) => {
                const bidderItem = document.createElement("p");
                bidderItem.innerText = `User: ${bid.bidder.name}, Amount: ${bid.amount}`;
                biddersList.appendChild(bidderItem);
            });
        }
    
    modal.classList.remove("hidden");
};