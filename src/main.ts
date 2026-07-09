import './style.css';

const apiKey = "890a758e5dc3f915c0265ac8d3b5c873";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Weather App</h1>
  <input id="city" placeholder="Enter city" />
  <button id="search">Search</button>
  <div id="result"></div>
`;

const input = document.getElementById("city") as HTMLInputElement;
const button = document.getElementById("search")!;
const result = document.getElementById("result")!;

button.addEventListener("click", async () => {
  const city = input.value;

  if (!city) {
    result.innerHTML = "Enter a city";
    return;
  }

  result.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      result.innerHTML = "City not found";
      return;
    }

 const icon = data.weather[0].icon;

result.innerHTML = `
  <h2>${data.name}</h2>
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
  <p>🌡️ ${data.main.temp}°C</p>
  <p>🌥️ ${data.weather[0].description}</p>
`;
  } catch {
    result.innerHTML = "Error fetching weather";
  }
});