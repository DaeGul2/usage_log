const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
require('dotenv').config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const ddb = DynamoDBDocumentClient.from(client);

async function saveLogToDynamo(logItem) {
  const command = new PutCommand({
    TableName: 'usage_logs',
    Item: logItem,
  });
  await ddb.send(command);
}

module.exports = { saveLogToDynamo };
