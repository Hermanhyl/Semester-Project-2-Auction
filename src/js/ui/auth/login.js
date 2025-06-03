import { login } from "../../api/auth/login";

/**
 * Handles the login form submission event.
 * Prevents the default form submission, extracts email and password from the form,
 * and calls the login function with the provided credentials.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */

export async function onlogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    const loginData = {
        email: formData.get("email"),
        password: formData.get("password"),
    }
    
    await login(loginData);
}