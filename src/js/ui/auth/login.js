import { login } from "../../api/auth/login";

export async function onlogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    const loginData = {
        email: formData.get("email"),
        password: formData.get("password"),
    }
    console.log("login data", loginData);
    
    login(loginData);
}