// scripts.js

const apiKey = 'f209eb6cc95f5b04e2fae6eb89186e15'; // Replace with your actual API key

function getWeather() {
    const cityInput = document.getElementById('city');
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(weatherData) {
    const resultDiv = document.getElementById('result');

    if (weatherData.cod === '404') {
        resultDiv.innerHTML = 'City not found. Please enter a valid city name.';
    } else {
        const cityName = weatherData.name;
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;

        const htmlContent = `<p>Weather in ${cityName}: ${description}</p>
                             <p>Temperature: ${temperature} &#8451;</p>`;

        resultDiv.innerHTML = htmlContent;
    }
}

