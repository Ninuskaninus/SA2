import { getListings } from "../listingsService.js";
import {
  housingTags,
  electronicsTags,
  vehiclesTags,
} from "../../utils/tags.js";
import { createCards } from "../listingsDisplay.js";

export async function filterRender() {
  const listings = await getListings();
  const housing = housingTags;
  const electronics = electronicsTags;
  const vehicles = vehiclesTags;

  const housingBtn = document.querySelector("#housing");
  housingBtn.addEventListener("click", () => {
    const housingListings = listings.filter((listing) => {
      return listing.tags.some((tag) => housing.includes(tag));
    });
    renderListings(housingListings, "housing");
  });

  const electronicsBtn = document.querySelector("#electronics");
  electronicsBtn.addEventListener("click", () => {
    const electronicsListings = listings.filter((listing) => {
      return listing.tags.some((tag) => electronics.includes(tag));
    });
    renderListings(electronicsListings, "electronics");
  });

  const vehiclesBtn = document.querySelector("#vehicles");
  vehiclesBtn.addEventListener("click", () => {
    const vehiclesListings = listings.filter((listing) => {
      return listing.tags.some((tag) => vehicles.includes(tag));
    });
    renderListings(vehiclesListings, "vehicles");
  });
}

function renderListings(listings, category) {
  const listingsContainer = document.querySelector("#listingsContainer");
  const messageContainer = document.querySelector("#messageContainer");

  if (!listingsContainer || !messageContainer) {
    console.error("Listings or message container not found.");
    return;
  }

  listingsContainer.innerHTML = "";
  if (listings.length > 0) {
    listings.forEach((listing) => {
      createCards(listingsContainer, listing);
    });
    messageContainer.classList.add = "d-none";
  } else {
    messageContainer.classList.remove = "d-none";
    messageContainer.textContent = `No listings found for ${category}.`;
  }
}
