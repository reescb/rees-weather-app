//date format

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML = `${forecastHTML}
    <div class="col-1">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              ${index}
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="38" />
              <div class="weather-forecast-temperature">
                <span class="weather-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°C</span>
                <span class="weather-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°C</span>
              </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//display weather position

function getForecast(coordinates) {
  let apiKey = "f0b1594042f8bed99c56223ceb9a1125";
  let apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
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
