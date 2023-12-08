const url =
  "https://api.noroff.dev/api/v1/auction/listings?_bids=true&_seller=true&_tags=true&_active=true&sort=created&sortOrder=desc";

export async function getListings() {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const formattedData = data.map((listings) => {
          const getBids = listings.bids.map((bid) => ({
            amount: bid.amount,
            id: bid.id,
            created: bid.created,
            bidderName: bid.bidderName,
          }));

          const getSeller = {
            name: listings.seller.name,
            email: listings.seller.email,
            avatar: listings.seller.avatar,
          };

          const getListings = {
            bids: getBids,
            created: listings.created,
            description: listings.description,
            endsAt: listings.endsAt,
            id: listings.id,
            media: listings.media,
            seller: getSeller,
            tags: listings.tags,
            title: listings.title,
            updated: listings.updated,
            _count: listings._count,
          };
          return getListings;
        });

        return formattedData;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function formatDateTime(dateTimeString) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("no-NO", options).format(
    new Date(dateTimeString),
  );
  return formattedDate.replace(",", ""); // Remove the comma between date and time
}
