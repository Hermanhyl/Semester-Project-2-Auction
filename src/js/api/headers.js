import { API_KEY } from "./constants";

const accessToken = JSON.parse(localStorage.getItem('token'));

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