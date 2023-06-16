    function getWeather() {
        var city = document.getElementById('city').value
        var apiKey = '6bf4485ae5944199abfabdd2cf787eb7' // Replace with your OpenWeatherMap API key

        // Make API call to retrieve weather information
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.cod !== 200) {
              throw new Error(data.message)
            }

            var temperature = data.main.temp
            var humidity = data.main.humidity
            var windSpeed = data.wind.speed

            var minTemp = data.main.temp_min
            var maxTemp = data.main.temp_max

            var sunrise = data.sys.sunrise
            var sunset = data.sys.sunset

            // Convert temperature from Kelvin to Celsius
            temperature = temperature - 273.15
            minTemp = minTemp - 273.15
            maxTemp = maxTemp - 273.15

            // Convert sunrise and sunset times to readable format
            sunrise = new Date(sunrise * 1000).toLocaleTimeString()
            sunset = new Date(sunset * 1000).toLocaleTimeString()

            // Display weather information
            var resultDiv = document.getElementById('result')
            resultDiv.innerHTML = `
        <p>Temperature: ${temperature.toFixed(2)}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Min. Temperature: ${minTemp.toFixed(2)}°C</p>
        <p>Max. Temperature: ${maxTemp.toFixed(2)}°C</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
      `
          })
          .catch((error) => {
            console.log('Error:', error)
          })
      }
