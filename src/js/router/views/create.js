import { onCreateListing } from "../../ui/listing/create";
import { authGuard } from "../../utilitis/authGuard";



const form = document.forms.createListing;

form.addEventListener("submit", onCreateListing())



authGuard();