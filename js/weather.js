const weather = document.querySelector('.js-weather');

const API_KEY = '9771084c5df20aeafd7cd1c5043a8723';
const COORDS = 'coords';

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
      return response.json();
    }).then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      const description = json.weather[0].description;
      
      weather.innerText = `${temperature}℃, ${description} @ ${place}`;
    });
}

function saveCoords(coordsObject) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObject));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObject = {
    latitude,
    longitude
  }

  saveCoords(coordsObject);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't access geo location")
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);

    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();