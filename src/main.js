import "./css/style.css";
import router from "./js/router";
import { setLogoutListener } from "./js/ui/auth/logout";
import { createFooter } from "./js/utilitis/footer";
import { generateNavbar } from "./js/utilitis/navBar";


async function loadMain() {

    await router(window.location.pathname);

    generateNavbar()

    setLogoutListener(); 

    createFooter()
}

loadMain()
