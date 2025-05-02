import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const LogTable = ({ logs }) => {
  const navigate = useNavigate();

  // 1. 앱-기능 사용 횟수 카운트
  const appFunctionCount = {};
  const userCount = {};
  const appExtraStats = {};

  logs.forEach((log) => {
    // 앱-기능 카운트
    const appFuncKey = `${log.app_name} - ${log.function_name}`;
    appFunctionCount[appFuncKey] = (appFunctionCount[appFuncKey] || 0) + 1;

    // 사용자별 카운트
    userCount[log.user_name] = (userCount[log.user_name] || 0) + 1;

    // 앱별 extra 내부 속성 합산
    if (log.extra && typeof log.extra === 'object') {
      const appName = log.app_name;
      if (!appExtraStats[appName]) appExtraStats[appName] = {};
      for (const [key, val] of Object.entries(log.extra)) {
        if (typeof val === 'number') {
          appExtraStats[appName][key] = (appExtraStats[appName][key] || 0) + val;
        }
      }
    }
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>앱 이름</TableCell>
                <TableCell>기능</TableCell>
                <TableCell>사용자</TableCell>
                <TableCell>IP</TableCell>
                <TableCell>시간</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow
                  key={log.log_id}
                  hover
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/logdetail/${log.log_id}`)}
                >
                  <TableCell>{log.app_name}</TableCell>
                  <TableCell>{log.function_name}</TableCell>
                  <TableCell>{log.user_name}</TableCell>
                  <TableCell>{log.user_ip}</TableCell>
                  <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* 미니 대시보드 */}
      <Grid item xs={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">📊 미니 대시보드</Typography>

          <Box mt={2}>
            <Typography variant="subtitle1">🧩 앱-기능별 사용 횟수</Typography>
            {Object.entries(appFunctionCount).map(([key, count]) => (
              <Typography key={key} variant="body2">{key}: {count}회</Typography>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="subtitle1">👤 사용자별 사용 횟수</Typography>
            {Object.entries(userCount).map(([user, count]) => (
              <Typography key={user} variant="body2">{user}: {count}회</Typography>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="subtitle1">🧮 앱별 extra 합계</Typography>
            {Object.entries(appExtraStats).map(([appName, stats]) => (
              <Box key={appName} mb={1}>
                <Typography variant="body2"><strong>{appName}</strong></Typography>
                {Object.entries(stats).map(([key, val]) => (
                  <Typography key={key} variant="body2" sx={{ pl: 1 }}>
                    - {key}: {val}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LogTable;
