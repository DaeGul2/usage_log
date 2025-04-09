import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import api from '../api';

const LoginPage = ({ onLogin }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await api.post('/login', { key });
      onLogin();
    } catch {
      setError('잘못된 키입니다.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>로그인</Typography>
        <TextField 
          fullWidth 
          label="접속 키" 
          value={key} 
          onChange={e => setKey(e.target.value)} 
          type="password" // ✅ 이 줄 추가
        />
        <Button 
          fullWidth 
          sx={{ mt: 2 }} 
          variant="contained" 
          onClick={handleLogin}
        >
          로그인
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default LoginPage;
