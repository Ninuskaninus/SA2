export function deleteListing(listingCard) {
    const listingId = listingCard.id;
    const base_url = "https://api.noroff.dev/api/v1/auction/listings/";
    const url = base_url + listingId;
    const token = localStorage.getItem("token");

    const deleteListing = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(url, deleteListing)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return Promise.resolve();
        })
        .then(() => {
            alert("Listing deleted!");
            console.log("Success: Listing deleted successfully");
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
