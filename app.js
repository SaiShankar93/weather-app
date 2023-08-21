const apiKey = "57bf1cf1da91d697a649254e4cb64cba";

// Displaying date
let today = new Date();
let options = {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
let day = today.toLocaleDateString("en-US", options);
const displayDay = document.getElementById("date");
displayDay.innerHTML = day;

//function to get input from the user and checking if location is found.
function getWeather() {
  const locationInput = document.getElementById("locationInput");
  const location = locationInput.value.trim();

  if (!location) {
    alert(
      "Sorry, we could not able to find Your location right now. Please retry later ;)."
    );
    return;
  }
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  //function to get weather info
  getWeatherDetails(apiUrl);
}

//display weather by using auto detecting the user's current location
function currentLocationweather() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Constructing the API URL
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        getWeatherDetails(apiUrl);
      },
      function (error) {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function getWeatherDetails(apiUrl) {
  fetch(apiUrl)
    //parsing the json
    .then((response) => response.json())
    .then(function (data) {
      //function  to display the weather in the weatherinfo div
      displayWeather(data);
    })
    //handling  errors
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert(
        "Sorry, we could not able to find Your location right now. Please retry later ;)"
      );
    });
}

//sends the weahter data to the weahterInfo div  using the data from the json
function displayWeather(data) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  weatherInfoDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <h3>Temperature: ${data.main.temp}°C</h3>
    <p>Max temperature : ${data.main.temp_max}</p>
    <p>Min temperature : ${data.main.temp_min}</p>
    <p>Description: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

//code for displaying random quotes
function readQuotesFromFile(filename, callback) {
  fetch(filename)
    .then(response => response.text())
    .then(text => {
      const quotes = text.split('\n');
      callback(quotes);
    })
    .catch(error => {
      console.error('Error while reading the file:', error);
      callback([]);
    });
}

function getRandomQuote(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayRandomQuote() {
  readQuotesFromFile('/quotes.txt', quotes => {
    const quoteElement = document.getElementById('quote'); 
      const randomQuote = getRandomQuote(quotes);
      quoteElement.textContent = randomQuote;
    });
}

// Call the function to display a random quote when the page loads
displayRandomQuote();




// const backgroundAudio = document.getElementById("backgroundAudio");
// const playPauseButton = document.getElementById("playPauseButton");

// playPauseButton.addEventListener("click", togglePlayPause);

// function togglePlayPause() {
//   if (backgroundAudio.paused) {
//     backgroundAudio.play();
//     playPauseButton.innerHTML = "<i class='fa-solid fa-pause'></i>";
//   } else {
//     backgroundAudio.pause();
//     playPauseButton.innerHTML = "<i class='fa-solid fa-play'></i>";
//   }
// }
