const apiKey = "a6313936fac23333de728fee63567560"; //  Replace with your OpenWeatherMap API key

// DOM elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const regionsDiv = document.getElementById("regions");

//  Fetch weather by city
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},PK&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      showWeather(data);
    } else {
      weatherResult.innerHTML = `<p> City not found!</p>`;
    }
  } catch (error) {
    weatherResult.innerHTML = `<p>Error fetching data!</p>`;
  }
}

//  Show weather result
function showWeather(data) {
  weatherResult.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${data.weather[0].main}</strong> (${data.weather[0].description})</p>
    <p>🌡 Temp: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind: ${data.wind.speed} m/s</p>
  `;
}

//  Search button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

//  Predefined regions (Pakistan provinces)
const provinces = [
  { name: "KPK", city: "Peshawar" },
  { name: "Sindh", city: "Karachi" },
  { name: "Punjab", city: "Lahore" },
  { name: "Balochistan", city: "Quetta" },
  { name: "Gilgit Baltistan", city: "Gilgit" }
];

//  Load regional weather
async function loadRegionWeather() {
  regionsDiv.innerHTML = "Loading regional weather...";
  let html = "";
  for (const region of provinces) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${region.city},PK&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    html += `
      <div class="region">
        <h3>${region.name}</h3>
        <p>${data.weather[0].main}</p>
        <p>🌡 ${data.main.temp}°C</p>
        <p>${data.weather[0].description}</p>
      </div>
    `;
  }
  regionsDiv.innerHTML = html;
}

// Load on start
loadRegionWeather();
