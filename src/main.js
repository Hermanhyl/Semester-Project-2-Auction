import "./css/style.css";
import router from "./js/router";
import { setLogoutListener } from "./js/ui/auth/logout";
import { generateNavbar } from "./js/utilitis/navBar";


await router(window.location.pathname);

generateNavbar()

setLogoutListener(); 
