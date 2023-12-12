import { getProfile } from "../auth/profile/profileService.js";
import { logout } from "../auth/login/logout.js";
import { getListings } from "../listings/listingsService.js";
import { bidRender } from "../listings/bidding/bidRender.js";

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
  const loginTitle = document.querySelector("#loginModalLabel");

  const loginBtns = document.querySelectorAll(".login-btn");
  if (!token) {
    loginBtns.forEach((btn) => {
      btn.innerHTML = "Login";
      loginTitle.innerHTML = "Login";
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

export function preventListing() {
  const token = localStorage.getItem("token");
  const addListingBtn = document.querySelectorAll(".sell-btn");
  const loginTitle = document.querySelector("#loginModalLabel");
  
  if (!token) {
    addListingBtn.forEach((btn) => {
      btn.dataset.toggle = "modal";
      btn.dataset.target = "#loginModal";
      loginTitle.innerHTML = "You have to log in to sell items";
    });
  } else {
    addListingBtn.forEach((btn) => {
      btn.dataset.toggle = "modal";
      btn.dataset.target = "#addListingModal";
    });
  }
}

export async function preventBid() {
  const token = localStorage.getItem("token");
  const bidBtns = document.querySelectorAll(".bid-btn");
  const loginTitle = document.querySelector("#loginModalLabel");

  if (!token) {
    bidBtns.forEach((btn) => {
      btn.dataset.toggle = "modal";
      btn.dataset.target = "#loginModal";
      loginTitle.innerHTML = "You have to log in to bid on items";
    });
  } else {
    bidBtns.forEach((btn) => {
      btn.dataset.toggle = "modal";
      btn.dataset.target = "#bidModal";
    });

    bidRender();
  }


}
