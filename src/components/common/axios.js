import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://193.124.114.46:3001/',
    responseType: 'json',
});

instance.interceptors.request.use((request) => {
    if (request.method === 'post') {
        request.headers['Content-Type'] = 'application/json';
    }
    request.headers.Authorization = `Bearer ${window.localStorage.access_token}`;
    return request;
});


export default instance;
