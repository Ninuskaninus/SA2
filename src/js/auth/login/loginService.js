import { loginForm } from "./loginForm.js"

const url = "https://api.noroff.dev/api/v1/auction/auth/login"

export async function login() {
    const loginBody = loginForm();

    async function postLogin() {
        try {
            const postLogin = {
                method: "POST",
                body: JSON.stringify(loginBody),
                headers: {
                    "Content-Type": "application/json"
                },
            };

            const response = await fetch(url, postLogin);
            const json = await response.json();

            if (response.status === 200) {
                localStorage.setItem("token", json.accessToken);
                localStorage.setItem("username", json.name);
                window.location.href = "index.html";
            } else {
                console.log("Something went wrong");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    postLogin(url, loginBody);
}