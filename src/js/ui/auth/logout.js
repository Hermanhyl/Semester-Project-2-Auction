import { onLogout } from "../global/logout";

/**
 * Sets up an event listener for the logout button.
 * Waits for the DOM to be fully loaded, then attaches a click event listener
 * to the element with the ID "logoutBtn". When clicked, it calls the onLogout function.
 * Logs an error if the logout button is not found in the DOM.
 *
 * @function setLogoutListener
 */

export function setLogoutListener() {
    document.addEventListener("DOMContentLoaded", () => {
        const logoutButton = document.getElementById("logoutBtn");
        if (!logoutButton) {
            console.error("Logout button not found");
            return;
        }

        logoutButton.addEventListener("click", () => {
            onLogout();
        });
    });
}