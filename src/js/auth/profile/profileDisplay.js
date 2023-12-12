import { getProfile } from "./profileService.js";
import { getListings } from "../../listings/listingsService.js";
import { deleteListing } from "./deleteListingService.js";
import {changeAvatar} from "./changeAvatarService.js";

const myProfile = await getProfile();
const listings = await getListings();
const username = myProfile.username;
const myListings = myProfile.allListings;

const myBids = listings.filter(listing =>
    listing.bids.some(bid => bid.bidderName === username)
);

export function profileDisplay() {
  heroInfo();
  changeAvatarDisplay();
  listingCards();
  myBidsDisplay();
    
}

function heroInfo() {
  const userAvatar = document.querySelector("#userAvatar");
  if (!myProfile.avatar) {
    myProfile.avatar = "https://mf.no/themes/custom/mf/images/avatar-mf-placeholder-215.png";
    } else {
        userAvatar.src = myProfile.avatar;
    }

    userAvatar.alt = myProfile.username;

    const usernameDisplay = document.querySelector("#userName");
    usernameDisplay.innerText = myProfile.username;

    const userCredit = document.querySelector("#userCredit");
    userCredit.innerText = "  " + myProfile.credit;

    const userWins = document.querySelector("#userWins");
    userWins.innerText = "  " + myProfile.wins.length;
}

 document.querySelector("#avatarUrl").addEventListener("input", changeAvatarDisplay);

function changeAvatarDisplay() {
  const currentAvatar = document.querySelector("#currentAvatar");
  const changeAvatarInput = document.querySelector("#avatarUrl");
  const avatarValue = changeAvatarInput.value;

  if (avatarValue) {
    currentAvatar.src = avatarValue;
  } else {
    currentAvatar.src = myProfile.avatar;
  }
}

const changeAvatarBtn = document.querySelector("#changeAvatarBtn");
changeAvatarBtn.addEventListener("click", async (event) => {
  const changeAvatarInput = document.querySelector("#avatarUrl");
  const avatarError1 = document.querySelector("#errorAvatar1");
  const avatarError2 = document.querySelector("#errorAvatar2");
  const avatarValue = changeAvatarInput.value;

  if (avatarValue === myProfile.avatar) {
    changeAvatarInput.classList.add("error");
    avatarError1.classList.remove("d-none");
  }

  if (avatarValue === "") {
    changeAvatarInput.classList.add("error");
    avatarError2.classList.remove("d-none");
  }

  if (!changeAvatarInput.classList.contains("error")) {
    // Remove the input event listener temporarily
    changeAvatarInput.removeEventListener("input", changeAvatarDisplay);
    changeAvatar(avatarValue);
    changeAvatarInput.addEventListener("input", changeAvatarDisplay);


  }
});


function listingCards() {
    const userListingsContainer = document.querySelector("#userListingsContainer");
    myListings.forEach(listing => {
    const listingContainer = document.createElement("div");
    listingContainer.classList.add("col-md-4", "mb-4");
    userListingsContainer.appendChild(listingContainer);

        const listingCard = document.createElement("div");
        listingCard.classList.add("card", "listing-card");
        listingCard.id = listing.id;
        listingContainer.appendChild(listingCard);
      
      const deleteModal = document.createElement("div");
      deleteModal.classList.add("delete-modal", "d-none");
      deleteModal.id = "deleteModal";
      listingCard.appendChild(deleteModal);

      const deleteModalDialog = document.createElement("div");
      deleteModalDialog.classList.add("modal-dialog", "delete-modal-dialog");
      deleteModal.appendChild(deleteModalDialog);

      const deleteModalContent = document.createElement("div");
      deleteModalContent.classList.add("modal-content", "delete-modal-content");
      deleteModalDialog.appendChild(deleteModalContent);

      const deleteModalHeader = document.createElement("h3");
      deleteModalHeader.textContent = "Are you sure you want to delete this listing?";
      deleteModalContent.appendChild(deleteModalHeader);

      const deleteModalBtnContainer = document.createElement("div");
      deleteModalBtnContainer.classList.add("delete-modal-btn-container");
      deleteModalContent.appendChild(deleteModalBtnContainer);

      const deleteModalBtn = document.createElement("button");
      deleteModalBtn.classList.add("btn", "btn-danger", "delete-modal-btn");
      deleteModalBtn.textContent = "Delete";
      deleteModalBtnContainer.appendChild(deleteModalBtn);

      deleteModalBtn.addEventListener("click", async () => {
        deleteListing(listingCard);
      });

      const deleteModalCloseBtn = document.createElement("button");
      deleteModalCloseBtn.classList.add("btn", "btn-secondary", "delete-modal-btn", "ms-2");
      deleteModalCloseBtn.textContent = "Cancel";
      deleteModalBtnContainer.appendChild(deleteModalCloseBtn);

      deleteModalCloseBtn.addEventListener("click", () => {
        deleteModal.classList.toggle("d-none");
      });

        const listingImg = document.createElement("img");
        listingImg.classList.add("card-img-top", "profile-card-img");
        listingImg.src = listing.media[0];
        listingCard.appendChild(listingImg);
    
        const listingBody = document.createElement("div");
        listingBody.classList.add("card-body", "listing-body");
        listingCard.appendChild(listingBody);
      
        const listingDeadline = document.createElement("p"); 
        listingDeadline.classList.add("card-text", "mt-2");
        const deadline = new Date(listing.endsAt);
        const now = new Date();
          if (deadline < now) {
            listingDeadline.innerText = "Ended";
            listingDeadline.style.color = "red";
          } else {
            listingDeadline.innerText = "Ends:" + listing.endsAt;
          }
      
        listingBody.appendChild(listingDeadline);

        const listingTitle = document.createElement("h5");
        listingTitle.classList.add("card-title");
        listingTitle.innerText = listing.title;
        listingBody.appendChild(listingTitle);
      
        const listingDescription = document.createElement("p");
        listingDescription.classList.add("card-text");
        listingDescription.innerText = listing.description;
        listingBody.appendChild(listingDescription);

        const listingPrice = document.createElement("p");
        listingPrice.classList.add("card-text");
        listingBody.appendChild(listingPrice);

        const listingFooter = document.createElement("div");
        listingFooter.classList.add("card-footer", "d-flex", "justify-content-between", "align-items-center");
        listingCard.appendChild(listingFooter);

        const listingBtn = document.createElement("button");
        listingBtn.classList.add("btn",  "btn-danger");
        listingBtn.innerText = "Delete";
      listingFooter.appendChild(listingBtn);
      
        listingBtn.addEventListener("click", async () => {
          deleteModal.classList.toggle("d-none");
      });

      return listingContainer.id;
      
    });
}

function myBidsDisplay() {
  const bidListContainer = document.querySelector("#bidsList");

  myBids.forEach(listing => { 
const bidContainer = document.createElement("div");
bidContainer.classList.add("mb-4", "row");
bidListContainer.appendChild(bidContainer);

const bidCard = document.createElement("div");
bidCard.classList.add("card", "col-md-8", "w-100"); // Adjust the column width as needed
bidCard.id = listing.id;
bidContainer.appendChild(bidCard);

const bidBody = document.createElement("div");
bidBody.classList.add("card-body", "row");
bidCard.appendChild(bidBody);

const bidContent = document.createElement("div");
bidContent.classList.add("col-md-8"); // Adjust the column width as needed
bidBody.appendChild(bidContent);

const bidTitle = document.createElement("h5");
bidTitle.classList.add("card-title");
bidTitle.innerText = listing.title;
bidContent.appendChild(bidTitle);

const bidPrice = document.createElement("p");
bidPrice.classList.add("card-text", "m-0");
const highestBid = listing.bids;
highestBid.sort((a, b) => b.amount - a.amount);
bidPrice.innerText = highestBid.length > 0 ? highestBid[0].amount + " Credits" : "0 Credits";
bidContent.appendChild(bidPrice);

const bidUsername = document.createElement("small");
bidUsername.classList.add("card-text");
bidUsername.innerText = highestBid[0].bidderName;
bidContent.appendChild(bidUsername);

const bidBtnContainer = document.createElement("div");
bidBtnContainer.classList.add("col-md-4", "d-flex", "justify-content-end", "align-items-center"); // Adjust the column width as needed
bidBody.appendChild(bidBtnContainer);

const bidBtn = document.createElement("a");
bidBtn.classList.add("btn", "btn-primary", "view-listing-btn");
bidBtn.innerText = "View listing";
bidBtnContainer.appendChild(bidBtn);

  });
}
