// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LogDetailPage from './pages/LogDetailPage';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // 'admin_auth' 쿠키가 존재하는지 확인하여 인증 상태를 결정합니다.
    const hasCookie = document.cookie.includes('admin_auth');
    setAuthenticated(hasCookie);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* 루트("/") 경로는 인증 여부에 따라 리다이렉트 처리 */}
        <Route 
          path="/" 
          element={authenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
        />
        {/* 로그인 라우트: 이미 인증된 상태라면 대시보드로 */}
        <Route 
          path="/login" 
          element={
            authenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <LoginPage onLogin={() => setAuthenticated(true)} />
          } 
        />
        {/* 보호된 페이지는 인증한 사용자만 접근 가능 */}
        <Route 
          path="/dashboard" 
          element={<DashboardPage onLogout={() => setAuthenticated(false)} />} 
        />
        <Route 
          path="/logdetail/:id" 
          element={<LogDetailPage />} 
        />
        {/* 그 외의 경로는 기본적으로 로그인 페이지로 리다이렉트 */}
        <Route 
          path="*" 
          element={<Navigate to="/login" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
