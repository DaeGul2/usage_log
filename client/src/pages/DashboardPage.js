import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, TextField } from '@mui/material';
import api from '../api';
import LogTable from '../components/LogTable';
import { useNavigate } from 'react-router-dom';

const DashboardPage = ({ onLogout }) => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      const res = await api.get('/log/logs');
      setLogs(res.data);
    } catch (err) {
      console.error('로그 가져오기 실패', err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      onLogout();
      navigate('/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
    } catch (err) {
      console.error('로그아웃 실패', err);
    }
  };

  const filteredLogs = logs.filter(log =>
    log.app_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>사용 로그 대시보드</Typography>
          <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <TextField
          label="앱 이름 검색"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />
        <LogTable logs={filteredLogs} />
      </Container>
    </>
  );
};

export default DashboardPage;
