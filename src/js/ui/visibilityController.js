import { getProfile } from '../auth/profile/profileService.js';
import { logout } from '../auth/login/logout.js';
const myProfile = await getProfile();


export function topBar() {
    const topBar = document.querySelector("#topBar");
    const token = localStorage.getItem("token");

    if (!token) {
        topBar.classList.add("d-none");
    } else {
        topBar.classList.remove("d-none");
    }

    const topUsername = document.querySelector("#topUsername");
    topUsername.innerHTML = myProfile.username;

    const topCredit = document.querySelector("#topCredit");
    topCredit.innerHTML = myProfile.credit;

    const topAvatar = document.querySelector("#topAvatar");
    topAvatar.src = myProfile.avatar;
    topAvatar.alt = myProfile.username;
    topAvatar.style.border = "1px solid white";
}

export function changeLoginBtn() {
  const token = localStorage.getItem("token");

  const loginBtns = document.querySelectorAll(".login-btn");
  if (!token) {
    loginBtns.forEach((btn) => {
      btn.innerHTML = "Login";
    });
  } else {
    loginBtns.forEach((btn) => {
      btn.innerHTML = "Logout";
        btn.dataset.toggle = "none"; 
        btn.dataset.target = "none";
      btn.addEventListener("click", () => {
        logout();
      });
    });
  }

  const registerBtn = document.querySelectorAll(".register-btn");
  if (!token) {
    registerBtn.forEach((btn) => {
      btn.innerHTML = "Register";
    });
  } else {
    registerBtn.forEach((btn) => {
      btn.innerHTML = "Profile";
      btn.href = "/profile/index.html";
      btn.dataset.toggle = "none";
      btn.dataset.target = "none";
    });
  }
}

