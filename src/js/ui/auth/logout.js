import { onLogout } from "../global/logout";

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