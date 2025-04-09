const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { saveLogToDynamo, getAllLogs } = require('../utils/dynamo');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // ✅ 헤더에서 인증용 비밀 키 읽기
    const secretFromClient = req.headers['log_secret'];

    if (secretFromClient !== process.env.LOG_SECRET) {
      return res.status(401).json({ status: 'unauthorized', message: 'invalid log secret' });
    }

    const {
      app_name,
      function_name,
      user_name,
      extra = {},
    } = req.body;

    const user_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const logItem = {
      log_id: uuidv4(),
      app_name,
      function_name,
      user_ip,
      user_name,
      extra,
      createdAt: new Date().toISOString(), // 서버에서도 createdAt 남김
    };

    console.log(logItem);
    await saveLogToDynamo(logItem);
    res.json({ status: 'success', log_id: logItem.log_id });
  } catch (err) {
    console.error('❌ 로그 저장 실패:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ✅ NEW: 로그 조회 (Read)
router.get('/logs', async (req, res) => {
  try {
    const logs = await getAllLogs();
    const sorted = logs.sort((a, b) =>
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
    res.json(sorted);
  } catch (err) {
    console.error('❌ 로그 조회 실패:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});
module.exports = router;
