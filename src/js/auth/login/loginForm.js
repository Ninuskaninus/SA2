export function loginForm() {
    const emailInput = document.querySelector("#loginEmail");
    const passwordInput = document.querySelector("#loginPassword");
    
    const loginBody = {
        email: emailInput.value,
        password: passwordInput.value
    }

    return loginBody;
}