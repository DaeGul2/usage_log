import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE + '/api',
  withCredentials: true, // 쿠키 전송
});

// 모든 요청에 LOG_SECRET 환경변수를 헤더에 첨부합니다.
api.interceptors.request.use(
  (config) => {
    config.headers['LOG_SECRET'] = process.env.LOG_SECRET;
    return config;
  },
  (error) => Promise.reject(error)
);

  
export default api;
