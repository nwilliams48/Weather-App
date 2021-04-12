function currentDate(now) {
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML = forecastHTML + `
      <div class="col-sm">
          <div class="card">
            <div class="card-body">
               <h5 class="card-title">${day}</h5>
                <i class="fas fa-cloud-sun"></i>
                <p class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">
                    8°</span>
                  <span class="weather-forecast-temperature-min">
                    5°</span>
                </p>
            </div>
          </div>
        </div>
  `;
  });

  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function currentTemperature(response) {
  console.log(response.data)
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#description")
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  
  
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;

  let apiKey = "33098ebc3e6d70b785afa638f3f87592";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentTemperature);
}

function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("h2");
  heading.innerHTML = `${temperature}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "33098ebc3e6d70b785afa638f3f87592";
  let units = "imperial";
  let apiLatUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiLatUrl).then(showCurrentTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getPosition);

let now = new Date();

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = currentDate(now);

let form = document.querySelector("#search-form");

displayForecast();

form.addEventListener("submit", search);
