/**
 * Handles the search form submission event, prevents the default form action,
 * retrieves the value from the search input field, trims whitespace, and returns it.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<string>} The sanitized search input value.
 */

export async function onSearchListing(event) {
    event.preventDefault(); // Prevent default form action
    const form = event.target;
    const searchInput = form.querySelector("#search-bar");
    return searchInput.value.trim(); // Return sanitized input value
}