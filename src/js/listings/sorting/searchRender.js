import { createCards } from "../listingsRenderer.js";

export async function searchRender(
  listings,
  searchInput,
  searchBtn,
  listingsContainer,
) {
  searchBtn.addEventListener("click", () => {
    const searchValue = searchInput.value.toLowerCase();
    const searchResults = listings.filter((listing) => {
      const titleMatch =
        listing.title && listing.title.toLowerCase().includes(searchValue);
      const descriptionMatch =
        listing.description &&
        listing.description.toLowerCase().includes(searchValue);
      const tagsMatch =
        listing.tags &&
        listing.tags.some((tag) => tag.toLowerCase().includes(searchValue));

      return titleMatch || descriptionMatch || tagsMatch;
    });

    renderSearchResults(searchResults, listingsContainer);
  });

  function renderSearchResults(searchResults, container) {
    container.innerHTML = "";

    if (searchResults.length > 0) {
      searchResults.forEach((listing) => {
        createCards(container, listing);
      });
    } else {
      renderErrorMessage(container);
    }
  }

  function renderErrorMessage(container) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "No matching listings found.";
    errorMessage.classList.add("error-message");
    container.appendChild(errorMessage);
  }
}
