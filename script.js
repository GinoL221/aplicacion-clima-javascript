import API_KEY from "./config.js";

const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
const difKelvin = 273.15;

document.getElementById("searchButton").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) {
    fetchWeather(city);
  } else {
    alert("Ingrese una ciudad valida");
  }
});

function fetchWeather(city) {
  fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ciudad no encontrada");
      }
      return response.json();
    })
    .then((data) => showWeatherData(data))
    .catch((error) => {
      alert(error.message);
    });
}

function showWeatherData(data) {
  const divResponseData = document.getElementById("responseData");
  divResponseData.innerHTML = "";

  const cityName = data.name;
  const country = data.sys.country;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  const cityInfo = document.createElement("h2");
  cityInfo.textContent = `${cityName}, ${country}`;

  const tempInfo = document.createElement("p");
  tempInfo.textContent = `La temperatura: ${Math.floor(
    temperature - difKelvin
  )}°C`;

  const humidityInfo = document.createElement("p");
  humidityInfo.textContent = `La humedad es del ${humidity}%`;

  const imgIcon = document.createElement("img");
  imgIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const descriptionInfo = document.createElement("p");
  descriptionInfo.textContent = `El clima es ${description}`;

  divResponseData.appendChild(cityInfo);
  divResponseData.appendChild(tempInfo);
  divResponseData.appendChild(humidityInfo);
  divResponseData.appendChild(imgIcon);
  divResponseData.appendChild(descriptionInfo);
}
