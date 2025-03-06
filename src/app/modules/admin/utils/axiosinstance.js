
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_SERVER_URL || 'https://backend.cloudqlobe.com/' //https://backend.cloudqlobe.com/' , // Ensure this points to your backend
});
// console.log("url",process.env.REACT_APP_PUBLIC_SERVER_URL);

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('token'); 

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
