import { loginTrigger } from "../ui/buttonController.js";
import { topBar } from "../ui/visibilityController.js";
import { getProfile } from "../auth/profile/profileService.js";
import { changeLoginBtn } from "../ui/visibilityController.js";
import { registerTrigger } from "../ui/buttonController.js";
import { renderedListings } from "../listings/listingsDisplay.js";
import { addListingsTrigger } from "../ui/buttonController.js";
import { preventListing } from "../ui/visibilityController.js";
import { searchRender } from "../listings/sorting/searchDisplay.js";
import { filterRender } from "../listings/sorting/filterDisplay.js";
import { getListings } from "../listings/listingsService.js";
import { preventBid } from "../ui/visibilityController.js";
import { bidTrigger } from "../ui/buttonController.js";

const token = localStorage.getItem("token");

loginTrigger();
registerTrigger();

const listingModal = document.querySelector("#listingModal");
if (listingModal) {
}

addListingsTrigger();
changeLoginBtn();
preventListing();

const listings = await getListings();
renderedListings(listings);

preventBid();

if (token) {
  topBar();
}

const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const listingsContainer = document.querySelector("#listingsContainer");

searchRender(listings, searchInput, searchBtn, listingsContainer);
filterRender(listings, listingsContainer);

bidTrigger();

getProfile();
