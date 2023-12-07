const base_url = "https://api.noroff.dev/api/v1/auction/profiles/";
const username = localStorage.getItem("username");
const profile_url = "?_listings=true&_bids=true";
const url = base_url + username + profile_url;
const token = localStorage.getItem("token");

export async function getProfile() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null; 
  }

  try {
    const response = await fetch(url, {
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
    };

    return myProfile;
  } catch (error) {
    console.error("Error fetching profile");
    throw error;
  }
}


