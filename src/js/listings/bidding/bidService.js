export function addBid() {
    const modalContainer = document.querySelector(".modal-content");
    const listingID = modalContainer.id;
    const base_url = "https://api.noroff.dev/api/v1/auction/listings/";
    const bid_url = base_url + listingID + "/bids";
    const token = localStorage.getItem("token");

    const bidAmountString = document.querySelector("#bidAmount").value;
    const bidAmount = parseFloat(bidAmountString);

    if (!isNaN(bidAmount)) {
        const bid = {
            amount: bidAmount,
        };

        const postBid = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bid),
        };

        fetch(bid_url, postBid)
            .then((response) => response.json())
            .then((data) => {
                alert("Bid added!");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    } else {
        console.error("Invalid bid amount. Please enter a valid number.");
    }
}
