export async function onSearchListing(event) {
    event.preventDefault(); // Prevent default form action
    const form = event.target;
    const searchInput = form.querySelector("#search-bar");
    return searchInput.value.trim(); // Return sanitized input value
}