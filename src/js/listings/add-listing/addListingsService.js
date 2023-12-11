import { addListingForm } from "./listingsForm.js";
addListingForm();


const url = "https://api.noroff.dev/api/v1/auction/listings";
const token = localStorage.getItem("token");

export async function addListing() {
    const listingObject = addListingForm();

    const tagsContainer = document.querySelector("#tags-container");
    const tags = tagsContainer.children;
    const tagsArray = Array.from(tags);
    const tagValue = tagsArray.map(tag => tag.innerText.replace("\nx", '').trim());

    const imageContainer = document.querySelector("#image-container");
    const images = imageContainer.children;
    const imagesArray = Array.from(images);
    const imageValue = imagesArray.map(image => image.style.backgroundImage.replace('url("', '').replace('")', ''));
    
    const listingPost = {
        title: listingObject.title,
        description: listingObject.description,
        endsAt: listingObject.endsAt,
        tags: tagValue,
        media: imageValue,
    }

    function postListing() {
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(listingPost),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    window.location.href = "index.html";
                });
        } catch (error) {
            console.log(error);
        }
    }

    postListing();
}