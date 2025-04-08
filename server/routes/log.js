const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { saveLogToDynamo } = require('../utils/dynamo');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
      // ✅ 쿠키에서 인증용 값 읽기
      const secretFromClient = req.cookies?.log_auth;
  
      if (secretFromClient !== process.env.LOG_SECRET) {
        return res.status(401).json({ status: 'unauthorized', message: 'invalid cookie' });
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
      };
      console.log(logItem);
      await saveLogToDynamo(logItem);
      res.json({ status: 'success', log_id: logItem.log_id });
    } catch (err) {
      console.error('❌ 로그 저장 실패:', err);
      res.status(500).json({ status: 'error', message: err.message });
    }
  });
  
module.exports = router;
