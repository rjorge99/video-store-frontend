import httpService from './httpService';

const endpoint = 'http://localhost:9000/api/auth';
const tokenKey = 'token';

httpService.setJwt(getJwt());

const login = async (username, password) => {
    const { data: jwt } = await httpService.post(`${endpoint}`, { username, password });
    localStorage.setItem(tokenKey, jwt);
    return jwt;
};

const validateToken = async (token) => {
    try {
        return await httpService.post(`${endpoint}/validateToken`);
    } catch (error) {
        httpService.removeJwt();
        localStorage.removeItem(tokenKey);
    }
};

const loginWithJwt = (jwt) => {
    localStorage.setItem(tokenKey, jwt);
};

const logout = () => {
    httpService.removeJwt();
    localStorage.removeItem(tokenKey);
};

function getJwt() {
    return localStorage.getItem(tokenKey);
}

const service = { login, logout, loginWithJwt, validateToken };
export default service;
