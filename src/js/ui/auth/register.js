import { register } from "../../api/auth/register";

/**
 * Handles the user registration form submission.
 * Prevents the default form submission behavior, extracts form data,
 * constructs a registration data object, and calls the register function.
 *
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 */

export async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target)

    const registerData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    };

    await register(registerData)
}