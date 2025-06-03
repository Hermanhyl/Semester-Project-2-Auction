import { searchListings } from "../api/profile/read";
import { runPage } from "../router/views/home";


/**
 * Handles the search functionality for the auction listings page.
 * 
 * Attaches event listeners to the search form and search button. When a search is submitted,
 * it prevents the default form submission, validates the input, displays appropriate messages,
 * clears previous results, fetches new search results, and updates the UI accordingly.
 * 
 * @async
 * @function searchHandel
 * @returns {Promise<void>} Resolves when the search handling is complete.
 * 
 * @listens submit on HTMLFormElement (searchform)
 * @listens click on HTMLElement (search-button)
 * 
 * @throws Will display an error message if the search operation fails.
 */

export async function searchHandel() {
    const form = document.forms.searchform;
    const displaySearchWord = document.getElementById("search-result-message");
    const searchButton = document.getElementById("search-button");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const searchInput = document.getElementById("search-bar").value.trim();

        if (!searchInput) {
            displaySearchWord.textContent = "Please enter a search term.";
            displaySearchWord.innerText = "hidden flex"
            return;
        }

        try {
            const listingContainer = document.getElementById("listingContainer");
            if (listingContainer) {
                listingContainer.innerHTML = ""; 
            }

            const searchResults = await searchListings(searchInput);

            if (searchResults && searchResults.length > 0) {
                displaySearchWord.textContent = `Results for "${searchInput}"`;
                displaySearchWord.classList.replace("hidden", "flex");
                await runPage(1, searchResults); 
            } else {
                displaySearchWord.textContent = `No results found for "${searchInput}"`;
                displaySearchWord.classList.replace("hidden", "flex");
                await runPage(1, []); 
            }
        } catch (error) {
            console.error("Search error:", error);
            displaySearchWord.textContent = "An error occurred while searching.";
            displaySearchWord.classList.replace("hidden", "flex");
            await runPage(1, []); 
        }
    });

    searchButton.addEventListener("click", () => {
        form.dispatchEvent(new Event("submit"));
    });
}