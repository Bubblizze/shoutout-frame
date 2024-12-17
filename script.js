// Function to fetch the streamer name from a text file
async function fetchStreamerName() {
    try {
        const response = await fetch('streamer_name.txt'); // Ensure the text file is in the same directory
        if (response.ok) {
            return await response.text(); // Return the name as plain text
        } else {
            console.warn("Text file not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching the streamer name:", error);
        return null;
    }
}

// Function to update the shoutout content
async function updateShoutout() {
    try {
        const urlParams = new URLSearchParams(window.location.search);

        // Check for name in the URL
        let streamerName = urlParams.get('name');
        const videoUrl = urlParams.get('video'); // Fetch video URL

        // If no name in URL, fetch from text file
        if (!streamerName) {
            console.log("No 'name' parameter found. Falling back to text file.");
            streamerName = await fetchStreamerName();
        }

        // Update the streamer name
        const nameElement = document.getElementById('streamer-name');
        if (streamerName) {
            nameElement.innerText = streamerName.trim();
            nameElement.classList.add('visible'); // Add fade-in effect
        } else {
            nameElement.innerText = "Streamer not found";
        }

        // Update the video iframe
        const videoElement = document.getElementById('video-frame');
        if (videoUrl) {
            videoElement.src = videoUrl;
        } else {
            console.warn("No video URL provided.");
        }
    } catch (error) {
        console.error("Error updating shoutout:", error);
        document.getElementById('streamer-name').innerText = "Error loading content";
    }
}

// Initialize the shoutout content
updateShoutout();
