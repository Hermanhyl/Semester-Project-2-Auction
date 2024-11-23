import { generateNavbar } from "../../utilitis/navBar";
import { onlogin } from "../../ui/auth/login";

generateNavbar()

const form = document.forms.login;

form.addEventListener("submit", onlogin);