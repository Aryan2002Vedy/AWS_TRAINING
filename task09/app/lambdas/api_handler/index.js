const WeatherClient = require("../layers/weather_sdk/weatherClient");

exports.handler = async (event) => {
    const path = event.rawPath;
    const method = event.requestContext.http.method;

    if (path !== "/weather" || method !== "GET") {
        return {
            statusCode: 400,
            body: JSON.stringify({
                statusCode: 400,
                message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
            }),
            headers: { "content-type": "application/json" },
            isBase64Encoded: false
        };
    }

    try {
        const weatherClient = new WeatherClient();
        const weatherData = await weatherClient.getWeather(50.4375, 30.5);

        return {
            statusCode: 200,
            body: JSON.stringify(weatherData),
            headers: { "content-type": "application/json" },
            isBase64Encoded: false
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
            headers: { "content-type": "application/json" },
            isBase64Encoded: false
        };
    }
};
