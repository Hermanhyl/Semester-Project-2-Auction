import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers.js"

const loginButton = document.getElementById("loginButton")
loginButton.addEventListener("click", handleLoginClick)

function handleLoginClick() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        login({ email, password });
    } else {
        alert("Please enter both email and password");
    }
}

export async function login({email, password}) {
    const body = {
        email: email,
        password: password
    }
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("blobbbb", data);
            
            localStorage.setItem('userInfo', JSON.stringify(data.data));
            localStorage.setItem('token', JSON.stringify(data.data.accessToken));
            window.location.href = "/"
            alert("Successfully logged in");
        } else {
            console.log("tompe lumpe");
            
        }
    } catch (error) {
        console.error("Error during login")
        alert("An error has occured")
    }
}