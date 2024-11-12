const usernames = ["@worldthroughjx"];
const tableBody = document.getElementById("data-table");

async function fetchFollowerCount(username) {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=https://www.instagram.com/${username}/?__a=1`);
        const data = await response.json();
        const profileData = JSON.parse(data.contents);
        const followerCount = profileData.graphql.user.edge_followed_by.count;
        return followerCount;
    } catch (error) {
        console.error(`Failed to fetch data for ${username}:`, error);
        return "N/A";
    }
}

async function updateTable() {
    tableBody.innerHTML = '';
    for (const username of usernames) {
        const count = await fetchFollowerCount(username);
        const row = `<tr><td>${username}</td><td>${count}</td></tr>`;
        tableBody.innerHTML += row;
    }
}

updateTable();
