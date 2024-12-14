export function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("listingId");
    localStorage.removeItem("userInfo");
    alert("Logged out")
    window.location.href = "/auth/login/";
}