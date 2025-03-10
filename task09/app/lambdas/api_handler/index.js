const { getWeatherData } = require("../layers/weather_sdk/index"); // Import from Lambda Layer

exports.lambdaHandler = async (event) => {
    const path = event.rawPath || "/";
    const method = event.requestContext?.http?.method || "GET";

    if (path === "/weather" && method === "GET") {
        try {
            const weatherData = await getWeatherData();

            return {
                statusCode: 200,
                body: JSON.stringify(weatherData),
                headers: {
                    "content-type": "application/json"
                },
                isBase64Encoded: false
            };
        } catch (error) {
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
