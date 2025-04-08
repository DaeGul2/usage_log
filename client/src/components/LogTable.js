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
} from '@mui/material';

const LogTable = ({ logs }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default LogTable;
