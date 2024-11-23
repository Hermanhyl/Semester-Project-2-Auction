import { API_AUTH_REGISTER } from "../constants";
import { headers } from "../headers";

export async function register({
    name,
    email,
    password,
}) {
    const body = {
        name: name,
        email: email,
        password: password,
    }
    try {
        const response = await fetch(API_AUTH_REGISTER, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(body),
        });
        if (response.ok) {
            alert(`succsessfully registered "${name}"`);
            window.location.href = "/auth/login/"
        }
    } catch(Error) {
        alert("Something went wrong");
    }
}