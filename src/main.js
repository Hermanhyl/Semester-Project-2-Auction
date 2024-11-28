import "./css/style.css";
import router from "./js/router";
import { generateNavbar } from "./js/utilitis/navBar";

await router(window.location.pathname);

generateNavbar()