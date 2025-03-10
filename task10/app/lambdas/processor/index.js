const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE;
const weatherAPI = "https://api.open-meteo.com/v1/forecast";

exports.handler = async (event) => {
    try {
        const response = await axios.get(weatherAPI, {
            params: {
                latitude: 50.4375,
                longitude: 30.5,
                hourly: "temperature_2m,time",
                timezone: "auto",
            }
        });

        const weatherData = response.data;
        const item = {
            id: uuidv4(),
            forecast: weatherData
        };

        await dynamoDB.put({
            TableName: tableName,
            Item: item
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Weather data stored successfully", id: item.id }),
            headers: { "content-type": "application/json" },
        };

    } catch (error) {
        console.error("Error fetching or storing weather data:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
            headers: { "content-type": "application/json" },
        };
    }
};
