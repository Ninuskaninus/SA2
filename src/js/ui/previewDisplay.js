import { getListings } from "../listings/listingsService.js";
const listings = await getListings();
const thisUrl = window.location.href;
const thisId = thisUrl.split("id=").pop();
const thisListing = listings.find((listing) => listing.id === thisId);
const token = localStorage.getItem("token");

export function previewDisplay() {
  galleryDisplay();
  sellerDisplay();
  listingDisplay();
  bidDisplay();
}

function galleryDisplay() {
  const galleryContainer = document.querySelector("#mediaCarousel");
  const gallery = thisListing.media;
  if (!gallery || gallery.length === 0) {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("carousel-item", "active");

    const galleryImage = document.createElement("img");
    galleryImage.classList.add("d-block", "w-100", "gallery-image");
    galleryImage.src =
      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
    galleryImage.alt = galleryItem.title;
    galleryItem.appendChild(galleryImage);

    galleryContainer.appendChild(galleryItem);
    const galleryIndicators = document.querySelectorAll(".carousel-indicator");
    galleryIndicators.forEach((indicator) => {
      indicator.classList.add("d-none");
    });
  } else {
    gallery.forEach((image, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.classList.add("carousel-item");
      if (index === 0) {
        galleryItem.classList.add("active");
      }

      const galleryImage = document.createElement("img");
      galleryImage.classList.add("d-block", "w-100", "gallery-image");
      galleryImage.src = image;
      galleryImage.alt = "Gallery image";

      galleryItem.appendChild(galleryImage);
      galleryContainer.appendChild(galleryItem);
    });
  }
}

function listingDisplay() {
  const listingTitle = document.querySelector("#listingTitle");
  listingTitle.textContent = thisListing.title;

  const listingDeadline = document.querySelector("#listingDeadline");
  listingDeadline.textContent = thisListing.endsAt;

  const listingDescription = document.querySelector("#listingDescription");
  listingDescription.textContent = thisListing.description;
}

function bidDisplay() {
  const highestBid = thisListing.bids;
  highestBid.sort((a, b) => b.amount - a.amount);

  const bidPrice = document.querySelector("#listingPrice");
  bidPrice.innerText =
    highestBid.length > 0 ? highestBid[0].amount + " Credits" : "0 Credits";

  const bidBtn = document.querySelector(".bid-btn");
  bidBtn.id = thisListing.id;

  const seller = thisListing.seller.name;
  const username = localStorage.getItem("username");

  if (seller === username) {
    bidBtn.classList.add("d-none");
  } else {
    bidBtn.classList.remove("d-none");
  }

  const bids = thisListing.bids;
  const bidsContainer = document.querySelector("#bidsContainer");
  const bidTitle = document.createElement("h5");
  bidTitle.classList.add("card-title", "mt-4");
  bidTitle.innerText = "Latest bids";
  bidsContainer.appendChild(bidTitle);

  const noBids = document.createElement("li");
  noBids.classList.add("list-group-item");

  if (!token) {
    noBids.innerText = "Log in to see bids";
    bidsContainer.appendChild(noBids);
    return;
  }

  if (bids.length === 0) {
    noBids.innerText = "No bids yet";
    bidsContainer.appendChild(noBids);
  }

  bids.forEach((bid) => {
    const bidList = document.createElement("li");
    bidList.classList.add("list-group-item", "d-flex", "align-items-center");

    if (bid.amount === highestBid[0].amount) {
      const leadingBid = document.createElement("img");
      leadingBid.src = "/src/assets/crown.png";
      leadingBid.alt = "Leading bid";
      leadingBid.classList.add("me-2");
      bidList.appendChild(leadingBid);
    }

    const bidText = document.createElement("span");
    bidText.textContent = `${bid.bidderName} - ${bid.amount} Credits`;
    bidList.appendChild(bidText);

    bidsContainer.appendChild(bidList);
  });
}

function sellerDisplay() {
  const sellerAvatar = document.querySelector("#sellerAvatar");
  if (thisListing.seller.avatar === "" || !thisListing.seller.avatar || thisListing.seller.avatar === undefined) {
    sellerAvatar.src =
      "https://mf.no/themes/custom/mf/images/avatar-mf-placeholder-215.png";
  } else {
    sellerAvatar.src = thisListing.seller.avatar;
    }

  const sellerUsername = document.querySelector("#sellerUsername");
  sellerUsername.textContent = thisListing.seller.name;

  const sellerEmail = document.querySelector("#sellerEmail");
  sellerEmail.textContent = thisListing.seller.email;
}
