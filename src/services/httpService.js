import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) console.log('Axios errro: ', error);

    return Promise.reject(error);
});

const service = { get: axios.get, post: axios.post, put: axios.put, delete: axios.delete };
export default service;
