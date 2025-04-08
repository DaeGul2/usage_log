const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');
require('dotenv').config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

// ✅ 로그 저장 (Create)
async function saveLogToDynamo(logItem) {
  const command = new PutCommand({
    TableName: 'usage_logs',
    Item: logItem,
  });
  await ddbDocClient.send(command);
}

// ✅ 로그 조회 (Read)
async function getAllLogs() {
  const command = new ScanCommand({
    TableName: 'usage_logs',
  });
  const result = await ddbDocClient.send(command);
  return result.Items || [];
}

module.exports = {
  saveLogToDynamo,
  getAllLogs,
  ddbDocClient, // 혹시 직접 Scan 쓰고 싶을 때 사용
};
