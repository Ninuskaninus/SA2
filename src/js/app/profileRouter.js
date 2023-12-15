import { profileDisplay } from "../ui/profileDisplay.js";
import { topBar } from "../ui/visibilityController.js";
import { changeLoginBtn } from "../ui/visibilityController.js";
import { addListingsTrigger } from "../ui/buttonController.js";

const loader = document.querySelector(".loader");
loader.classList.remove("d-none");

profileDisplay();
topBar();

changeLoginBtn();
addListingsTrigger();

loader.classList.add("d-none");
