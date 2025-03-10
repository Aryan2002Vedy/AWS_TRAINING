const axios = require("axios");

class WeatherClient {
    constructor() {
        this.baseUrl = "https://api.open-meteo.com/v1/forecast";
    }

    async getWeather(latitude, longitude) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    latitude,
                    longitude,
                    hourly: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m"],
                    current: ["temperature_2m", "wind_speed_10m"],
                    timezone: "auto",
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw new Error("Failed to retrieve weather data");
        }
    }
}

module.exports = WeatherClient;
