import "./css/style.css";
import router from "./js/router";
import { setLogoutListener } from "./js/ui/auth/logout";
import { createFooter } from "./js/utilitis/footer";
import { generateNavbar } from "./js/utilitis/navBar";


/**
 * Initializes the main application logic.
 * 
 * - Routes the application based on the current window location.
 * - Generates the navigation bar.
 * - Sets up the logout event listener.
 * - Creates the footer.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Resolves when all initialization steps are complete.
 */

async function loadMain() {

    await router(window.location.pathname);

    generateNavbar()

    setLogoutListener(); 

    createFooter()
}

loadMain()
