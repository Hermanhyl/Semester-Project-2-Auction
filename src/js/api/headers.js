import { API_KEY } from "./constants";

const accessToken = JSON.parse(localStorage.getItem('token'));

/**
 * Constructs and returns a Headers object with necessary authentication and content type headers.
 *
 * - Adds "X-Noroff-API-Key" header if `API_KEY` is defined.
 * - Adds "Authorization" header with Bearer token if `accessToken` is defined.
 * - Always adds "Content-Type: application/json" header.
 *
 * @returns {Headers} A Headers object configured for API requests.
 */

export function headers() {
    const headers = new Headers();

    if (API_KEY) {
        headers.append("X-Noroff-API-Key", API_KEY);
    }

    if (accessToken) {
        headers.append("Authorization", `Bearer ${accessToken}`)
    }

    headers.append("Content-Type", "application/json");
    return headers;
}