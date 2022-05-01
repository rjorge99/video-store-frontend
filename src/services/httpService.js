import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) toast.error('An error has ocurred');

    return Promise.reject(error);
});

const setJwt = (jwt) => {
    axios.defaults.headers.common['x-auth-token'] = jwt;
};

const removeJwt = (jwt) => {
    delete axios.defaults.headers.common['x-auth-token'];
};

const service = {
    setJwt,
    removeJwt,
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
export default service;
