// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LogDetailPage from './pages/LogDetailPage';
import ProtectedRoute from './ProtectedRoute'; // 새로 생성한 보호된 라우트 컴포넌트
import api from './api'; // axios 인스턴스 (withCredentials: true 설정)

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // 서버의 checkAuth 엔드포인트를 호출하여 현재 인증 상태를 확인합니다.
    api.get('/checkAuth')
      .then(res => {
        setAuthenticated(res.data.authenticated);
      })
      .catch(err => {
        console.error('인증 확인 실패:', err);
        setAuthenticated(false);
      });
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
        {/* 보호된 페이지: ProtectedRoute로 감싸서 인증되지 않은 접근 차단 */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute authenticated={authenticated}>
              <DashboardPage onLogout={() => setAuthenticated(false)} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/logdetail/:id" 
          element={
            <ProtectedRoute authenticated={authenticated}>
              <LogDetailPage />
            </ProtectedRoute>
          } 
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
