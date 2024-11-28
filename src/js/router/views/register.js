import { onRegister } from "../../ui/auth/register";

const form = document.forms.register;

form.addEventListener("submit", onRegister);

// set up logoutListener