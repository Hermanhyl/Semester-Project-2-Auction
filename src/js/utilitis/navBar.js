export function generateNavbar() {
    const navbarItems = [
        { name: "Home", link: "/" },
        { name: "Profile", link: "/profile/" },
        { name: "Create Listing", link: "/post/create/" },
        { name: "Login", link: "/auth/login/" },
        { name: "Logout", id: "logoutBtn" } 
    ];

    const navbar = document.getElementById("navbar");
    if (!navbar) {
        console.error("Navbar element not found!");
        return;
    }

    const navContainer = document.createElement("nav");
    navContainer.classList.add("navbar");

    navbarItems.forEach(item => {
        const navLink = document.createElement("a");
        navLink.textContent = item.name;

        if (item.id) {
            navLink.id = item.id; 
            navLink.href = "#"; 
        } else {
            navLink.href = item.link; 
        }

        navContainer.appendChild(navLink);
    });

    navbar.appendChild(navContainer);
}