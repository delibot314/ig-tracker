// Array of usernames to track
const usernames = ["@worldthroughjx", "@xoxochermaine", "@bellywellyjelly"];

// Get the table body to insert data into
const tableBody = document.getElementById("data-table");

// Fetch follower count for each username
async function fetchFollowerCount(username) {
    try {
        // Fetch Instagram data using the AllOrigins API
        const response = await fetch(`https://api.allorigins.win/get?url=https://www.instagram.com/${username}/?__a=1`);
        const data = await response.json();
        
        // Parse the JSON response
        const profileData = JSON.parse(data.contents);
        
        // Get the follower count
        const followerCount = profileData.graphql.user.edge_followed_by.count;
        return followerCount;
    } catch (error) {
        console.error(`Failed to fetch data for ${username}:`, error);
        return "N/A"; // Return "N/A" if there is an error
    }
}

// Update the table with follower counts for each username
async function updateTable() {
    // Clear any existing rows in the table
    tableBody.innerHTML = '';
    
    // Loop through each username and fetch the follower count
    for (const username of usernames) {
        const count = await fetchFollowerCount(username); // Fetch count for the current username
        const row = `<tr><td>${username}</td><td>${count}</td></tr>`; // Create a table row for each username and their follower count
        tableBody.innerHTML += row; // Append the row to the table
    }
}

// Call the function to update the table when the page loads
updateTable();
