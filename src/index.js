function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getUTCDay() - 1;
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
let date = new Date();

let dateElement = document.querySelector("#update-date");
dateElement.innerHTML = formatDate(date);

//City search result

function displayWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function showSearchValue(event) {
  event.preventDefault();
  let apiKey = "f0b1594042f8bed99c56223ceb9a1125";
  let units = "metric";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
  let searchInput = document.querySelector("#search-input");
  document.getElementById("currentCity").innerHTML = `${searchInput.value}`;
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", showSearchValue);
