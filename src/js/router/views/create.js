import { onCreateListing } from "../../ui/listing/create";
import { authGuard } from "../../utilitis/authGuard";
import { generateNavbar } from "../../utilitis/navBar";


const form = document.forms.createListing;

form.addEventListener("submit", onCreateListing)

generateNavbar();

authGuard();