/**
 * Logs the user out by removing authentication and user-related data from localStorage,
 * displays a logout alert, and redirects the user to the login page.
 */
export function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("listingId");
    localStorage.removeItem("userInfo");
    alert("Logged out")
    window.location.href = "/auth/login/";
}