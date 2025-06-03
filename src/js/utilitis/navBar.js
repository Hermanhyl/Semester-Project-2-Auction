/**
 * Generates and renders the navigation bar dynamically based on the user's authentication status.
 * 
 * - Displays navigation items (Home, Profile, Create Listing) with icons.
 * - Highlights the active navigation item based on the current URL.
 * - Disables Profile and Create Listing links for unauthenticated users.
 * - Shows a Login or Logout button depending on authentication state.
 * - Handles navigation item hover effects and authentication button actions.
 * 
 * @function
 * @returns {void}
 */
export function generateNavbar() {
    const navbarItems = [
        { name: "Home", link: "/", iconSolid: "fa-solid fa-house-chimney" },
        { name: "Profile", link: "/profile/", iconSolid: "fa-solid fa-user" },
        { name: "Create Listing", link: "/post/create/", iconSolid: "fa-solid fa-plus" }
    ];

    const navbar = document.getElementById("navbar");
    if (!navbar) {
        console.error("Navbar element not found!");
        return;
    }

    const isLoggedIn = Boolean(localStorage.getItem("token"));

    const navContainer = document.createElement("nav");
    navContainer.className = "navContainer p-4 shadow-lg text-black flex justify-between items-center max-w-screen-lg mx-auto";

    const logo = document.createElement("img");
    logo.src = "/image/logo-big.png";
    logo.alt = "Logo";
    logo.className = "logo w-20 h-auto";
    navContainer.appendChild(logo);

    const navItemsContainer = document.createElement("div");
    navItemsContainer.className = "flex gap-8 items-center"; 

    navbarItems.forEach(item => {
        const navLink = document.createElement("a");
        navLink.href = item.link;
        navLink.className = "flex flex-col items-center md:flex-row md:gap-2 md:text-base"; 

        const isActive = 
            (item.link === "/" && window.location.pathname === "/") || 
            (item.link !== "/" && window.location.pathname.startsWith(item.link));

        const icon = document.createElement("i");
        icon.className = item.iconSolid;
        icon.style.color = isActive ? "#B11125" : "#8D99AE"; 
        icon.classList.add("text-2xl", "transition-colors", "duration-300", "md:hidden");

        const text = document.createElement("span");
        text.textContent = item.name;
        text.className = "hidden md:inline-block text-lg font-medium transition-colors duration-300";
        text.style.color = isActive ? "#B11125" : "#8D99AE";

        if (!isLoggedIn && (item.link === "/profile/" || item.link === "/post/create/")) {
            navLink.classList.add("cursor-not-allowed", "opacity-50");
            navLink.title = "You must be logged in to access this section.";
            navLink.addEventListener("click", (e) => e.preventDefault());
        }

        navLink.addEventListener("mouseenter", () => {
            icon.style.color = isActive || isLoggedIn ? "#B11125" : "#8D99AE";
            text.style.color = isActive || isLoggedIn ? "#B11125" : "#8D99AE";
        });
        navLink.addEventListener("mouseleave", () => {
            if (!isActive) {
                icon.style.color = "#8D99AE";
                text.style.color = "#8D99AE";
            }
        });

        navLink.appendChild(icon);
        navLink.appendChild(text);
        navItemsContainer.appendChild(navLink);
    });

    navContainer.appendChild(navItemsContainer);

    const authContainer = document.createElement("div");
    authContainer.className = "authContainer";

    const authButton = document.createElement("button");
    authButton.className = "authButton bg-[#B11125] text-white py-2 px-4 rounded-md hover:bg-red-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-accentRed";
    authButton.textContent = isLoggedIn ? "Logout" : "Login";
    authButton.addEventListener("click", () => {
        if (isLoggedIn) {
            localStorage.removeItem("token");
            window.location.href = "/";
        } else {
            window.location.href = "/auth/login/";
        }
    });

    authContainer.appendChild(authButton);
    navContainer.appendChild(authContainer);

    navbar.appendChild(navContainer);
}