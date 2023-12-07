import { login } from "../auth/login/loginService.js";

export function loginTrigger() {
    const loginButton = document.querySelector("#loginBtn");
    const emailInput = document.querySelector("#loginEmail");
    const passwordInput = document.querySelector("#loginPassword");

    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (emailInput.value.length > 0 && passwordInput.value.length > 0) {
            login();
            console.log("Logged in!");
        } else {
            emailInput.classList.add("error");
            passwordInput.classList.add("error");
            console.log("Please fill in all fields");
        }
    });
}