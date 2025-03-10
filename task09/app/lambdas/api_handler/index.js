const axios = require("axios");

exports.lambdaHandler = async (event) => {
    const path = event.rawPath || "/";
    const method = event.requestContext?.http?.method || "GET";

    if (path === "/weather" && method === "GET") {
        try {
            // Call the Open-Meteo API
            const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
                params: {
                    latitude: 52.52,
                    longitude: 13.41,
                    current: "temperature_2m,wind_speed_10m",
                    hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m"
                }
            });

            return {
                statusCode: 200,
                body: JSON.stringify(response.data),
                headers: {
                    "content-type": "application/json"
                },
                isBase64Encoded: false
            };
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: "Failed to fetch weather data",
                    error: error.message
                }),
                headers: {
                    "content-type": "application/json"
                },
                isBase64Encoded: false
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                statusCode: 400,
                message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
            }),
            headers: {
                "content-type": "application/json"
            },
            isBase64Encoded: false
        };
    }
};
