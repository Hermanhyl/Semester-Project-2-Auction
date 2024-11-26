import { onRegister } from "../../ui/auth/register";
import { generateNavbar } from "../../utilitis/navBar";

generateNavbar()

const form = document.forms.register;

form.addEventListener("submit", onRegister);

// set up logoutListener