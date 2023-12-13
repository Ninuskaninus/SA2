import { topBar } from "../ui/visibilityController.js";
import { loginTrigger } from "../ui/buttonController.js";
import { registerTrigger } from "../ui/buttonController.js";
import { addListingsTrigger } from "../ui/buttonController.js";
import { preventListing } from "../ui/visibilityController.js";
import { preventBid } from "../ui/visibilityController.js";
import { bidTrigger } from "../ui/buttonController.js";
import { changeLoginBtn } from "../ui/visibilityController.js";
import { previewDisplay } from "../ui/previewDisplay.js";

const token = localStorage.getItem("token");

if (token) {
  topBar();
}

loginTrigger();
changeLoginBtn();
registerTrigger();
addListingsTrigger();
preventListing();
preventBid();
bidTrigger();
previewDisplay();
