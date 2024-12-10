import { onLogout } from "../global/logout";

export function setLogoutListener() {
    const logoutButton = document.getElementById("logoutBtn");
   logoutButton.addEventListener("click", () => {
      onLogout();
     })
}