import { loginTrigger } from '../ui/buttonController.js';
import { topBar } from '../ui/visibilityController.js';
import {getProfile} from '../auth/profile/profileService.js';
import {changeLoginBtn} from '../ui/visibilityController.js';




export function router() {
    const token = localStorage.getItem("token");
    loginTrigger();
    
    getProfile();

    if (token) {
        topBar();
    } 

    changeLoginBtn();
}
