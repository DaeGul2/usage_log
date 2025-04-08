require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logRouter = require('./routes/log');

const app = express();
app.use(express.json({ limit: '100kb' })); // ✅ 100KB 제한
app.use(cookieParser()); // ✅ 쿠키 파서 적용
app.use(cors());
app.use(express.json());

app.use('/api/log', logRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 로그 수신 서버 실행 중! http://localhost:${PORT}`);
});
