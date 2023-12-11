import { getListings } from "../listingsService.js";

export function bidRender() {
  const bidBtns = document.querySelectorAll(".bid-btn");
  const bidModal = document.querySelector("#bidModal");

  bidBtns.forEach((bidBtn) => {
    bidBtn.addEventListener("click", async () => {
      const listingId = bidBtn.id;
      const thisListing = await listingInfoDisplay(listingId);
    });
  });
}

async function listingInfoDisplay(listingId) {
  const listings = await getListings();
  const thisListing = listings.find((listing) => listing.id === listingId);

  const bidTitle = document.querySelector("#bidModalLabel");
  bidTitle.innerText = thisListing.title;

  const bidImg = document.querySelector("#bidImg");
  bidImg.src = thisListing.media[0];

  const bidDeadline = document.querySelector("#bidDeadline");
  bidDeadline.innerText = thisListing.endsAt;

  const highestBid = thisListing.bids;
  highestBid.sort((a, b) => b.amount - a.amount);

  const bidPrice = document.querySelector("#bidPrice");
  bidPrice.innerText = highestBid.length > 0 ? highestBid[0].amount + " Credits" : "0 Credits";

  const modalBody = document.querySelector(".modal-content");
  modalBody.id = thisListing.id;
}