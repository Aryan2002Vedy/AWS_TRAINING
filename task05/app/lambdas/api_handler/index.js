const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TARGET_TABLE || "Events"; // Ensure environment variable is set

exports.handler = async (event) => {
    try {
        console.log("Received Event:", JSON.stringify(event));

        const body = JSON.parse(event.body);  // Ensure event body is parsed
        if (!body.principalId || !body.content) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing required fields: principalId and content" })
            };
        }

        const newEvent = {
            id: uuidv4(),
            principalId: body.principalId,
            createdAt: new Date().toISOString(),
            body: body.content
        };

        await dynamoDB.put({ TableName: TABLE_NAME, Item: newEvent }).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({ event: newEvent })
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" })
        };
    }
};
