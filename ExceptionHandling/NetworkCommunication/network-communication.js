var logger = require('./logger.js');

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  var cityInput = document.getElementById('city-input');
  var errorMessage = document.getElementById('error-message');
  var weatherCard = document.getElementById('weather-card');

  try {
    var city = cityInput.value;

    // Check if the entered city is in the allowed cities array
    var allowedCities = ['London', 'Paris', 'New York', 'Tokyo', 'Sydney'];
    if (!allowedCities.includes(city)) {
      throw new Error('Invalid city. Please enter one of the allowed cities.');
    }

    // Perform weather API call
    makeWeatherApiCall(city)
      .then(function(response) {
        // Handle the API response and display the weather in the weather card
        var temperature = response.main.temp;
        var description = response.weather[0].description;
        var weatherHtml = `
          <h2>Weather in ${city}</h2>
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${description}</p>
        `;
        weatherCard.innerHTML = weatherHtml;
      })
      .catch(function(error) {
        throw new Error('Failed to fetch weather data. Please try again later.');
      });
  } catch (error) {
    // Log the error using the logger
    logger.error(error);

    // Display error message to the user
    errorMessage.textContent = error.message;
  } finally {
    // Perform any cleanup or additional tasks here
    cityInput.value = "";

    // Log completion or cleanup message using the logger
    logger.log("Form submission completed.");
  }
}

function makeWeatherApiCall(city) {
  // weather API endpoint and API key
  var apiKey = '7cd96ac617f8d626ed4ed9efe684c5ef';
  var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&apiKey=${apiKey}`;

  return fetch(apiUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error(`Weather API call failed with status ${response.status}`);
      }
      return response.json();
    });
}
