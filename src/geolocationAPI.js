// Function to handle successful location retrieval
async function handleLocationSuccess(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Get the location name using OpenCage Data API
    const apiKey = '9685286fde764665aef64312d9d4e669'; // Replace with your OpenCage Data API key
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);

    if (response.ok) {
        const data = await response.json();
        const locationName = data.results[0].formatted;
        const locationElement = document.getElementById('location');
        locationElement.textContent = locationName;
    } else {
        console.log("HTTP-Error: " + response.status);
    }
}

// Function to handle errors in location retrieval
function handleLocationError(error) {
    let errorMessage;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        default:
            errorMessage = "An unknown error occurred.";
            break;
    }

    console.log(errorMessage);

    // Display error message on the webpage
    const locationElement = document.getElementById('location');
    locationElement.textContent = 'Unable to retrieve your location';
}

// Function to get the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

// Call the function to get the location
getLocation();
