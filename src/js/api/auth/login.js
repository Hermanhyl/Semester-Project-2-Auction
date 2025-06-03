import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers.js"

const loginButton = document.getElementById("loginButton")
loginButton.addEventListener("click", handleLoginClick)

/**
 * Handles the login button click event.
 * Retrieves the email and password input values from the DOM,
 * validates that both fields are filled, and calls the login function
 * with the provided credentials. Alerts the user if either field is missing.
 *
 * @function
 * @returns {void}
 */

function handleLoginClick() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        login({ email, password });
    } else {
        alert("Please enter both email and password");
    }
}

/**
 * Authenticates a user with the provided email and password.
 *
 * Sends a POST request to the authentication endpoint with the user's credentials.
 * On successful login, stores user information and access token in localStorage,
 * redirects to the home page, and displays a success alert.
 * Handles incorrect credentials and other errors with appropriate alerts.
 *
 * @async
 * @function
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @returns {Promise<void>} Resolves when the login process is complete.
 */

export async function login({ email, password }) {
    const body = {
        email: email,
        password: password
    };
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem('userInfo', JSON.stringify(data.data));
            localStorage.setItem('token', JSON.stringify(data.data.accessToken));
            window.location.href = "/";
            alert("Successfully logged in");
        } else if (response.status === 401) {
            alert("Incorrect email or password. Please try again.");
        } else {
            
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage || "An unexpected error occurred."}`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error has occurred. Please check your internet connection and try again.");
    }
}