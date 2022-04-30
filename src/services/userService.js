import httpService from './httpService';

const endpoint = 'http://localhost:9000/api/users';

const register = async (username, email, password) => {
    return await httpService.post(endpoint, { username, email, password });
};

const service = {
    register
};

export default service;
