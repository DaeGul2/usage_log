require('dotenv').config();
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

// 1. 클라이언트 생성
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// 2. 저장할 로그 데이터
const logItem = {
  log_id: uuidv4(),
  app_name: 'resume_analyzer',
  function_name: 'generate_questions',
  user_ip: '123.123.123.123',
  user_name: '마래호바',
  extra: {
    input_length: 412,
    lang: 'ko',
  },
};

// 3. Put 요청 실행
async function saveLog() {
  try {
    const command = new PutCommand({
      TableName: 'usage_logs',
      Item: logItem,
    });

    await ddbDocClient.send(command);
    console.log('✅ 로그 저장 성공:', logItem);
  } catch (err) {
    console.error('❌ 로그 저장 실패:', err);
  }
}

saveLog();
