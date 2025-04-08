// RequireAuth.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const hasCookie = document.cookie.includes('admin_auth');
    setAuthenticated(hasCookie);
    setLoading(false);
  }, []);
  
  if (loading) return null;  // 로딩중일 때 아무것도 렌더링하지 않음
  return authenticated ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
