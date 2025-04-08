import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';
import { Typography, Box } from '@mui/material';

const LogDetailPage = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      const res = await api.get('/log/logs');
      const found = res.data.find((item) => item.log_id === id);
      setLog(found);
    };
    fetchLog();
  }, [id]);

  if (!log) return <div>로딩 중...</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>로그 상세</Typography>
      <pre>{JSON.stringify(log.extra, null, 2)}</pre>
    </Box>
  );
};

export default LogDetailPage;
