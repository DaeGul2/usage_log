const express = require('express');
const router = express.Router();
require('dotenv').config();

// 로그인
router.post('/login', (req, res) => {
  const { key } = req.body;
  console.log("로그인 : ", key);  

  if (key === process.env.ADMIN_SECRET_KEY) {
    // 쿠키 설정
    res.cookie('admin_auth', key, {
      httpOnly: true,
      sameSite: 'Strict',
      // secure: true, // HTTPS에서만 쿠키 쓸 때 사용
      maxAge: 1000 * 60 * 60 * 12 // 12시간
    });
    return res.json({ status: 'success' });
  } else {
    return res.status(401).json({ status: 'unauthorized', message: '잘못된 키입니다' });
  }
});

// 로그아웃
router.post('/logout', (req, res) => {
  console.log("로그아웃");
  res.clearCookie('admin_auth', { path: '/' });
  res.json({ status: 'logged_out' });
});

// Check Auth 엔드포인트: 클라이언트로부터 호출되어 쿠키의 유효성을 확인합니다.
router.get('/checkAuth', (req, res) => {
  const token = req.cookies?.admin_auth;
  if (token === process.env.ADMIN_SECRET_KEY) {
    return res.json({ authenticated: true });
  }
  return res.json({ authenticated: false });
});

module.exports = router;
