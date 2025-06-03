import { API_AUTH_REGISTER } from "../constants";
import { headers } from "../headers";

/**
 * Registers a new user with the provided name, email, and password.
 *
 * Sends a POST request to the registration API endpoint. On successful registration,
 * alerts the user and redirects to the login page. Handles duplicate email errors and
 * displays appropriate alerts for other errors.
 *
 * @async
 * @function
 * @param {Object} params - The registration parameters.
 * @param {string} params.name - The name of the user to register.
 * @param {string} params.email - The email address of the user to register.
 * @param {string} params.password - The password for the new user.
 * @returns {Promise<void>} Resolves when the registration process is complete.
 */

export async function register({ name, email, password }) {
    const body = {
        name: name,
        email: email,
        password: password,
    };

    try {
        const response = await fetch(API_AUTH_REGISTER, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(body),
        });

        if (response.ok) {
            alert(`Successfully registered "${name}"`);
            window.location.href = "/auth/login/";
        } else if (response.status === 409) {
            alert("A user with this email already exists. Please use a different email.");
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage || "An unexpected error occurred during registration."}`);
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("Something went wrong. Please try again later.");
    }
}