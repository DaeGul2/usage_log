require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const logRouter = require('./routes/log');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

app.use('/api/log', logRouter);
app.use('/api', authRouter); // ✅ /api/login, /api/logout

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 usage 로그 서버 running on port ${PORT}`);
});
