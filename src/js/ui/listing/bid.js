import { fetchBid, fetchBidders } from "../../api/listings/bid";


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

export const showBidders = async (id) => {
    const modal = document.getElementById("biddersModal");
    const biddersList = document.getElementById("biddersList");

    biddersList.innerHTML = "";

    
        const bidders = await fetchBidders(id);
        console.log("Bidders fetched:", bidders);

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