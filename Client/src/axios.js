import axios from 'axios';

const URL = process.env.REACT_APP_URL;

const instance = axios.create({
    baseURL: URL,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;
