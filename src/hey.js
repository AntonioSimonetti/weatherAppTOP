export {
  getInfo,
  extractWeatherInfo,
  storeWeatherData,
  getCustomIcon,
  changeValue,
};

//Shouldnt be stored here, but this is just an exercise;
const apiKey = "1728bdb6362c9c5017315728e9c0d63c";

//Not sure I need to declare globally
const city = document.getElementById("city-input").value;

//It fetches the data from the API and returns the response in JSON format
async function getInfo(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
      { mode: "cors" }
    );
    return await response.json();
  } catch (error) {
    console.log("Error", error);
  }
}

//It takes the raw data from the API and returns an object with the data we want to display
function extractWeatherInfo(rawData) {
  const location = rawData.name;
  const timestamp = rawData.dt;
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    //year: "numeric",        // I dont want the year to be displayed.
    month: "long",
    day: "numeric",
  };
  const readableDate = date.toLocaleDateString("en-US", options);
  const temperature = rawData.main.temp;
  const celsius = Math.round(temperature - 273.15);
  const weatherCondition = rawData.weather[0].main;
  const windSpeed = rawData.wind.speed;
  const humidity = rawData.main.humidity;
  const pressure = rawData.main.pressure;
  const sunriseTimestamp = rawData.sys.sunrise;
  const sunriseDate = new Date(sunriseTimestamp * 1000);
  const readableSunrise = sunriseDate.toLocaleString(undefined, {
    timeStyle: "short",
  });
  const sunsetTimestamp = rawData.sys.sunset;
  const sunsetDate = new Date(sunsetTimestamp * 1000);
  const readableSunset = sunsetDate.toLocaleString(undefined, {
    timeStyle: "short",
  });

  return {
    location,
    timestamp: readableDate,
    temperature: celsius,
    weatherCondition,
    humidity,
    windSpeed,
    pressure,
    sunrise: readableSunrise,
    sunset: readableSunset,
  };
}

//It takes in a parameter called data, assigns that parameter to a variable called weatherData
let weatherData;
function storeWeatherData(data) {
  weatherData = data;
  console.log(typeof weatherData);
  console.log(weatherData);
}

//The getCustomIcon function takes a weather condition as input and returns the path to a corresponding custom icon.
function getCustomIcon(weatherCondition) {
  const icons = {
    Thunderstorm: "thunderstorm.svg",
    Drizzle: "drizzle.svg",
    Rain: "rain.svg",
    Snow: "snow.svg",
    Atmosphere: "atmosphere.svg",
    Clear: "clear.svg",
    Clouds: "clouds.svg",
    Mist: "mist.svg",
  };
  const icon =
    weatherCondition in icons ? icons[weatherCondition] : "default.svg";
  return `./src/icons/${icon}`;
}

// Global counter to make toggle between different values in changevalue function
let counter = 0;

// To change from Imperial to  Metric and viceversa
function changeValue(temperature, windSpeed, pressure) {
  let celsius = temperature;
  let celsiusToFahrenheit = (temperature * 9) / 5 + 32;

  let mph = windSpeed;
  let mphToKm = Math.round(windSpeed * 3.6);

  let mbar = pressure;
  let mbarToinHg = Math.round(pressure * 0.02942998751);

  // weird prettier rule with the first document.getElementbyId
  if (counter === 0) {
    document.getElementById(
      "Temperature"
    ).textContent = `${celsiusToFahrenheit}°F`;
    document.getElementById("WindspeedDOM").textContent = `${mphToKm}km/h`;
    document.getElementById("PressureDOM").textContent = `${mbarToinHg} inHg`;

    counter = 1;
  } else {
    document.getElementById("Temperature").textContent = `${celsius}°C`;
    document.getElementById("WindspeedDOM").textContent = `${mph} m/s`;
    document.getElementById("PressureDOM").textContent = `${mbar} mbar`;

    counter = 0;
  }
}
