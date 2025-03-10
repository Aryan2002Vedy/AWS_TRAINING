const axios = require("axios");

async function getWeatherData() {
    try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
            params: {
                latitude: 52.52,
                longitude: 13.41,
                current: "temperature_2m,wind_speed_10m",
                hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Failed to fetch weather data");
    }
}

module.exports = { getWeatherData };
