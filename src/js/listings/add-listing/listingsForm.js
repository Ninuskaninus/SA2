// listingsForm.js
export function addListingForm() {
  const titleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");
  const deadlineInput = document.querySelector("#deadline");
  const tagsInput = document.querySelector("#tags");
  const imageInput = document.querySelector("#imageUrls");

  const tagsArray = [];
  const imageArray = [];

  const addImgBtn = document.querySelector("#addImgBtn");
  const addTagBtn = document.querySelector("#addTagBtn");

  const imageList = document.querySelector("#image-container");
  const tagList = document.querySelector("#tags-container");

  const listingObject = {
    title: titleInput.value,
    description: descriptionInput.value,
    endsAt: deadlineInput.value,
  };

  addImgBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const imageUrl = imageInput.value.trim();
    if (imageUrl !== "") {
      imageList.classList.add("mb-3");
      imageList.innerHTML = "";
      imageArray.push(imageUrl);
      imageInput.value = "";
      updateImageList();
    }
  });

  addTagBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const tag = tagsInput.value.trim();
    if (tag !== "") {
      tagList.classList.add("mb-3");
      tagList.innerHTML = "";
      tagsArray.push(tag);
      tagsInput.value = "";
      updateTagList();
    }
  });

  function updateImageList() {
    imageArray.forEach((image) => {
      const imageItem = document.createElement("div");
      imageItem.classList.add("img-element", "col-4", "m-1");
      imageItem.style.backgroundImage = `url(${image})`;
      imageList.appendChild(imageItem);

      const deleteImg = document.createElement("button");
      deleteImg.classList.add("remove-tag", "btn", "btn-danger", "btn-sm");
      deleteImg.innerText = "x";
      imageItem.appendChild(deleteImg);

      deleteImg.addEventListener("click", (event) => {
        event.preventDefault();
        const index = imageArray.indexOf(image);
        imageArray.splice(index, 1);
        imageItem.remove();
      });
    });
  }

  function updateTagList() {
    tagsArray.forEach((tag) => {
      const tagItem = document.createElement("div");
      tagItem.classList.add("tag-element", "col-4", "m-1");
      tagItem.innerText = tag;
      tagList.appendChild(tagItem);

      const deleteTag = document.createElement("button");
      deleteTag.classList.add("remove-tag", "btn", "btn-danger", "btn-sm");
      deleteTag.innerText = "x";
      tagItem.appendChild(deleteTag);

      deleteTag.addEventListener("click", (event) => {
        event.preventDefault();
        const index = tagsArray.indexOf(tag);
        tagsArray.splice(index, 1);
        tagItem.remove();
      });
    });
  }

  return listingObject;
}
