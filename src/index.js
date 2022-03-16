//date format

function formatDate(date) {
  let hours = date.getUTCHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getUTCDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return `${days[dayIndex]} ${hours}:${minutes}`;
}

//display forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-1">
              <div class="weather-forecast-date">Mon</div>
              <img src="src/images/sun.jpg" alt="" width="38" />
              <div class="weather-forecast-temperature">
                <span class="weather-temperature-max">18°C</span>
                <span class="weather-temperature-min">12°C</span>
              </div>
              </div>`;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">    
              <div class="weather-forecast-date">Tues</div>
              <img src="src/images/sun.jpg" alt="" width="38" />
              <div class="weather-forecast-temperature">
                <span class="weather-temperature-max">18°C</span>
                <span class="weather-temperature-min">12°C</span>
              </div>
              </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//display weather position

function displayWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  displayForecast();
}

function showSearchValue(event) {
  event.preventDefault();
  let units = "metric";
  let searchInput = document.querySelector("#search-input");
  document.getElementById("currentCity").innerHTML = `${searchInput.value}`;
  let apiKey = "f0b1594042f8bed99c56223ceb9a1125";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

//search form

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", showSearchValue);

//date

let date = new Date();

let dateElement = document.querySelector("#update-date");
dateElement.innerHTML = formatDate(date);
