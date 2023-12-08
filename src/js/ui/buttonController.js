import { login } from "../auth/login/loginService.js";
import { register } from "../auth/register/registerService.js";
import {addListing} from "../listings/addListingsService.js";
import { addListingForm } from "../listings/listingsForm.js";

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

export function registerTrigger() {
  const registerButton = document.querySelector("#registerBtn");
  const usernameInput = document.querySelector("#registerUsername");
  const emailInput = document.querySelector("#registerEmail");
  const passwordInput = document.querySelector("#registerPassword");
  const avatarInput = document.querySelector("#registerAvatar");

  const validEmailDomains = ["@noroff.no", "@stud.noroff.no"];

  const usernameError = document.querySelector("#usernameError");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");

  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    usernameInput.classList.remove("error");
    emailInput.classList.remove("error");
    passwordInput.classList.remove("error");
    avatarInput.classList.remove("error");

    const username = usernameInput.value.trim();
    if (username.includes(" ") || username.length < 0) {
      usernameInput.classList.add("error");
      usernameError.classList.remove("d-none");
      console.log("Username cannot contain spaces");
    } else {
      usernameError.classList.add("d-none");
      usernameInput.classList.remove("error");
    }

    const email = emailInput.value.trim();
    const validEmailDomains = ["@noroff.no", "@stud.noroff.no"];
    if (!validEmailDomains.some((domain) => email.endsWith(domain))) {
      emailInput.classList.add("error");
      emailError.classList.remove("d-none");
      console.log("Email must be a noroff.no or stud.noroff.no email");
    } else {
      emailError.classList.add("d-none");
      emailInput.classList.remove("error");
    }

    const password = passwordInput.value;
    if (password.length < 8) {
      passwordInput.classList.add("error");
      passwordError.classList.remove("d-none");
      console.log("Password must be at least 8 characters long");
    } else {
      passwordError.classList.add("d-none");
      passwordInput.classList.remove("error");
    }

    if (
      !usernameInput.classList.contains("error") &&
      !emailInput.classList.contains("error") &&
      !passwordInput.classList.contains("error") &&
      !avatarInput.classList.contains("error")
    ) {
      register();
    }
  });
}


export function addListingsTrigger() {
const addListingBtn = document.querySelector("#addListingBtn");
addListingBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addListing();
});
}
