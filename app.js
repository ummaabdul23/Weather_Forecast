//openWeatherMap API key
const apiKey = "";

//Function to get weather data
const getWeather = async (city) => {
    try{
        const base = "https://api.openweathermap.org/data/2.5/weather";
        const query = `?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(base + query);

         if(!response.ok) {
             throw new Error('City not found');
        }

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error fetching weather data:", error.message);
        alert("Error: " + error.message);
    }
};

//Function to display weather data
const displayWeather = (data) => {
    if(!data) {
        return;
    }

    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong>${data.main.temp}°C</p>
        <p><strong>Humidity:</strong>${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong>${data.wind.speed} m/s</p>
        <p><strong>Conditions:</strong>${data.weather[0].description}</p>`;
};

//event listener for form submission
const form = document.getElementById("search-box");
const city = document.getElementById("city-input");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cityInput = city.value.trim();
    form.reset();

    if(!cityInput) {
        alert("Please enter a city name");
        return;
    }


    const weatherData = await getWeatherData(cityInput);
    displayWeather(weatherData);
});