import { loginTrigger } from "../ui/buttonController.js";
import { topBar } from "../ui/visibilityController.js";
import { getProfile } from "../auth/profile/profileService.js";
import { changeLoginBtn } from "../ui/visibilityController.js";
import { registerTrigger } from "../ui/buttonController.js";
import { renderedListings } from "../listings/listingsRenderer.js";
import { addListingsTrigger } from "../ui/buttonController.js";
import { preventListing } from "../ui/visibilityController.js";
import { searchRender } from "../listings/sorting/searchRender.js";
import {filterRender} from "../listings/sorting/filterRender.js";
import { getListings } from "../listings/listingsService.js"; 
import { preventBid } from "../ui/visibilityController.js";
import { bidTrigger } from "../ui/buttonController.js";


export async function router() {
  const token = localStorage.getItem("token");

  // Trigger UI actions
  loginTrigger();
  registerTrigger();
  addListingsTrigger();
  changeLoginBtn();
  preventListing();
 

  // Fetch and render listings
  const listings = await getListings();
  renderedListings(listings);

  preventBid();


  // If user is logged in, show the top bar
  if (token) {
    topBar();
  }

  // Render search and filter functionality
  const searchInput = document.querySelector('#search');
  const searchBtn = document.querySelector('#searchBtn');
  const listingsContainer = document.querySelector('#listingsContainer');

  searchRender(listings, searchInput, searchBtn, listingsContainer);
  filterRender(listings, listingsContainer);

  bidTrigger();

  // Get user profile information
  getProfile();
}