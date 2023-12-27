// scripts.js

const apiKey = 'f209eb6cc95f5b04e2fae6eb89186e15'; // Replace with your actual API key

function getWeather() {
    // Get the city name from the input field
    const cityInput = document.getElementById('city');
    const city = cityInput.value;

    // Check if the city name is provided
    if (city.trim() === '') {
        alert('Please enter a city name.');
        return;
    }

    // API endpoint for current weather data
    const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch data from the API
    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the retrieved data and update the UI
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(weatherData) {
    // Get the result div
    const resultDiv = document.getElementById('result');

    // Check if the request was successful
    if (weatherData.cod === '404') {
        resultDiv.innerHTML = 'City not found. Please enter a valid city name.';
    } else {
        // Extract relevant information from the API response
        const cityName = weatherData.name;
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;

        // Create HTML content to display
        const htmlContent = `<p>Weather in ${cityName}: ${description}</p>
                             <p>Temperature: ${temperature} &#8451;</p>`;

        // Update the result div with the weather information
        resultDiv.innerHTML = htmlContent;
    }
}
