import { login } from "../auth/login/loginService.js";
import { register } from "../auth/register/registerService.js";
import { addListing } from "../listings/add-listing/addListingsService.js";
import { addBid } from "../listings/bidding/bidService.js";
import { getListings } from "../listings/listingsService.js";

const listings = await getListings();

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
  const titleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");
  const deadlineInput = document.querySelector("#deadline");

  const errorTitle = document.querySelector("#errorTitle");
  const errorDescription = document.querySelector("#errorDescription");
  const errorDeadline = document.querySelector("#errorDeadline");

addListingBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (titleInput.value === "") {
    titleInput.classList.add("error");
    errorTitle.classList.remove("d-none");
  } else {
    titleInput.classList.remove("error");
    errorTitle.classList.add("d-none");
  }

  if (descriptionInput.value === "") {
    descriptionInput.classList.add("error");
    errorDescription.classList.remove("d-none");
  } else {
    descriptionInput.classList.remove("error");
    errorDescription.classList.add("d-none");
  }

  if (deadlineInput.value === "") {
    deadlineInput.classList.add("error");
    errorDeadline.classList.remove("d-none");
  } else {
    deadlineInput.classList.remove("error");
    errorDeadline.classList.add("d-none");
  }

  if (
    !titleInput.classList.contains("error") &&
    !descriptionInput.classList.contains("error") &&
    !deadlineInput.classList.contains("error")
  ) {
    addListing();
    alert("Listing added!");
  }
});
}

export function bidTrigger() {
  const makeBidBtn = document.querySelector("#makeBid");

  makeBidBtn.addEventListener("click", async (e) => {
    const bidModal = document.querySelector(".modal-content");
    const listingID = bidModal.id;

    const thisListing = listings.find((listing) => listing.id === listingID);
    const bids = thisListing.bids;
    
    const highestBid = bids.sort((a, b) => b.amount - a.amount);

    const bidError = document.querySelector("#bidError");
    const bidInput = document.querySelector("#bidAmount");
    const bidAmount = parseFloat(bidInput.value);

    if (highestBid.length > 0 && bidAmount <= highestBid[0].amount) {
      bidError.classList.remove("d-none");
      bidInput.classList.add("error");
    } else {
      bidError.classList.add("d-none");
      bidInput.classList.remove("error");

      e.preventDefault();
      addBid(listingID, bidAmount, highestBid, bidError, bidInput);
    }
  });
}


