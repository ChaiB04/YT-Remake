import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8080',
  });

export default axiosConfig;