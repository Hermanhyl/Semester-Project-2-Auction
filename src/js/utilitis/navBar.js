export function generateNavbar() {
    const navbarItems = [
        { name: "Home", link: "/" },
        { name: "Profile", link: "/profile/" },
        { name: "Create Listing", link: "/post/create/" }
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
        navLink.href = item.link;
        navLink.textContent = item.name;
        navContainer.appendChild(navLink);
    });

    navbar.appendChild(navContainer);
}
