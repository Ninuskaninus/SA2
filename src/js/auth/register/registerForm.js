export function registerForm() {
    const usernameInput = document.querySelector("#registerUsername");
    const emailInput = document.querySelector("#registerEmail");
    const passwordInput = document.querySelector("#registerPassword");
    const avatarInput = document.querySelector("#registerAvatar");


    const registerBody = {
        name: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        avatar: avatarInput.value
    }

    return registerBody;
}