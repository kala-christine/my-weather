import './style.css';

const apiKey = "890a758e5dc3f915c0265ac8d3b5c873";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="card">
    <h1>🌤️ Weather App</h1>
    <input id="city" placeholder="Enter city..." />
    <button id="search">Search</button>
    <div id="result"></div>
  </div>
`;

const input = document.getElementById("city") as HTMLInputElement;
const button = document.getElementById("search")!;
const result = document.getElementById("result")!;

// 🔥 MAIN FUNCTION
async function getWeather() {
  const city = input.value.trim();

  if (!city) {
    result.innerHTML = "⚠️ Enter a city";
    return;
  }

  result.innerHTML = "⏳ Loading...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      result.innerHTML = "❌ City not found";
      return;
    }

    const icon = data.weather[0].icon;

   result.innerHTML = `
  <h2>${data.name}</h2>
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
  <p>🌡️ ${data.main.temp}°C</p>
  <p>🌥️ ${data.weather[0].description}</p>
  <p>💧 Humidity: ${data.main.humidity}%</p>
  <p>💨 Wind: ${data.wind.speed} m/s</p>
`;
  } catch (error) {
    result.innerHTML = "❌ Error fetching weather";
  }
}

// 🔘 BUTTON CLICK
button.addEventListener("click", getWeather);

// ⌨️ ENTER KEY (FIXED)
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});