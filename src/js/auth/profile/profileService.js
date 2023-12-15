const base_url = "https://api.noroff.dev/api/v1/auction/profiles/";
const username = localStorage.getItem("username");
const profile_url = "?_listings=true&_bids=true";
const listings_url = "/listings?_active=true&_seller=true&_bids=true";
const url_profile = base_url + username + profile_url;
const url_listings = base_url + username + listings_url;
const token = localStorage.getItem("token");

export async function getProfile() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(url_profile, {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    const myProfile = {
      avatar: json.avatar,
      username: json.name,
      email: json.email,
      listings: json._count,
      allListings: json.listings,
      wins: json.wins,
      credit: json.credits,
      bids: json.listings.bids,
    };

    return myProfile;
  } catch (error) {
    console.error("Error fetching profile");
    throw error;
  }
}
