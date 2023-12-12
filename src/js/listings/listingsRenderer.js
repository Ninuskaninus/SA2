import { getListings } from "./listingsService.js";
const listings = await getListings();

export function renderedListings() {
  const listingsContainer = document.getElementById("listingsContainer");
  listingsContainer.innerHTML = "";
  if (!listingsContainer) {
    console.error("Listings container not found");
    return;
  }

  const sortedListing = listings
    .filter(
      (listing) => listing.title && listing.title.toLowerCase() !== "test",
    )
    .sort((a, b) => new Date(b.updated) - new Date(a.updated));

  sortedListing.forEach((listing) => {
    createCards(listingsContainer, listing);
  });
}

export function createCards(container, listing) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("col-md-6", "mb-4");
  container.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("card", "h-100", "d-flex", "flex-column");
  cardContainer.appendChild(card);

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");

  const image = listing.media;

  if (image.length > 0) {
    cardImage.src = image[0];
  } else {
    cardImage.src =
      "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image@2x.png";
  }

  cardImage.alt = listing.title;
  card.appendChild(cardImage);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column");
  card.appendChild(cardBody);

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = listing.title;
  cardBody.appendChild(cardTitle);

  const cardText = document.createElement("small");
  cardText.classList.add("card-text", "flex-grow-1");
  cardText.textContent = "Deadline: ";
  cardBody.appendChild(cardText);

  const cardDeadline = document.createElement("span");
  cardDeadline.textContent = listing.endsAt;
  cardText.appendChild(cardDeadline);

  const sortedBids = listing.bids.sort((a, b) => b.amount - a.amount);

  const cardPrice = document.createElement("h4");
  cardPrice.classList.add("card-text", "text-light", "mb-4", "mt-4");
  cardBody.appendChild(cardPrice);

  const cardPriceSpan = document.createElement("span");
  if (sortedBids.length > 0) {
    cardPriceSpan.textContent = `${sortedBids[0].amount} Credit`;
  } else {
    cardPriceSpan.textContent = "0 Credit";
  }
  cardPrice.appendChild(cardPriceSpan);

  const cardFooter = document.createElement("div");
  cardFooter.classList.add(
    "d-flex",
    "justify-content-between",
    "mt-auto",
    "align-items-center",
  );
  cardBody.appendChild(cardFooter);

  const seeMore = document.createElement("a");
  seeMore.classList.add("btn-link");
  seeMore.textContent = "See more";
  seeMore.ariaLabel = "See more about this listing";
  seeMore.href = "/preview/index.html?id=" + listing.id;
  cardFooter.appendChild(seeMore);

  const bidBtn = document.createElement("button");
  bidBtn.classList.add("btn", "btn-success", "ml-2", "bid-btn");
  bidBtn.id = listing.id;
  bidBtn.textContent = "Bid on this";
  bidBtn.dataset.toggle = "modal";
  bidBtn.dataset.target = "#bidModal";
  cardFooter.appendChild(bidBtn);
}

function isValidImageUrl(url) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  const lowercasedUrl = url.toLowerCase();
  return imageExtensions.some((ext) => lowercasedUrl.endsWith(ext));
}
