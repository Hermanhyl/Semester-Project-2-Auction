import { displayListings } from "../../api/Listing/displayListings";
import { readListings } from "../../api/Listing/read";
import { generateNavbar } from "../../utilitis/navBar";


async function runPage() {
    const listings = await readListings()
    displayListings(listings)
}

runPage()

generateNavbar()


