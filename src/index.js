import {
  getInfo,
  extractWeatherInfo,
  storeWeatherData,
  getCustomIcon,
  changeValue,
} from "./hey.js";

import { displayWeatherData } from "./display.js";
import "./style.css";

let valore;

//It fetches the raw weather data, extracts the relevant weather information, stores the weather datafor later use, and displays the weather data on the page
async function main(city) {
  try {
    // Fetch the raw weather data
    const rawData = await getInfo(city);

    if (rawData.cod === "404") {
      alert("City not found. Please enter a valid city name.");
      return;
    }
    // Extract the relevant weather information
    const extractedData = extractWeatherInfo(rawData);

    // Store the weather data for later use
    storeWeatherData(extractedData);
    valore = extractedData;

    // Store the URL generated via getcustomicon function
    const iconUrl = getCustomIcon(extractedData.weatherCondition);

    // Display the weather data
    displayWeatherData(extractedData, iconUrl);
  } catch (error) {
    console.log("Error", error);
  }
}

document.getElementById("weather-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city-input").value;
  main(city);
});

document.getElementById("Change").addEventListener("click", function (event) {
  event.preventDefault();
  let temperature = valore.temperature;
  let windSpeed = valore.windSpeed;
  let pressure = valore.pressure;

  changeValue(temperature, windSpeed, pressure);
});
