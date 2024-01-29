import axios from 'axios';
import storeObject from './redux/app/Store'

const axiosConfig = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosConfig.interceptors.request.use(
  (config) => {
    const state = storeObject.getState();
    const token = state.usertoken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;