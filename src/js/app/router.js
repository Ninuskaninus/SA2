import { loginTrigger } from "../ui/buttonController.js";
import { topBar } from "../ui/visibilityController.js";
import { getProfile } from "../auth/profile/profileService.js";
import { changeLoginBtn } from "../ui/visibilityController.js";
import { registerTrigger } from "../ui/buttonController.js";
import { renderedListings } from "../listings/listingsRenderer.js";
import {addListingsTrigger} from "../ui/buttonController.js";
import {preventListing} from "../ui/visibilityController.js";
export function router() {
  const token = localStorage.getItem("token");
  loginTrigger();
  registerTrigger();
  addListingsTrigger();

  getProfile();
  renderedListings();

  if (token) {
    topBar();
  }

  changeLoginBtn();
  preventListing();
}
