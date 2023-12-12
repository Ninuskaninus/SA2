export function changeAvatar(avatarValue) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const base_url = "https://api.noroff.dev/api/v1/auction/profiles/";
    const url = base_url + username + "/media";

    const avatar = {
        avatar: avatarValue,
    };

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(avatar),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Avatar changed!");
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
