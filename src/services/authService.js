import httpService from './httpService';

const endpoint = 'http://localhost:9000/api/auth';
const tokenKey = 'token';

httpService.setJwt(getJwt());

const login = async (username, password) => {
    const { data: jwt } = await httpService.post(`${endpoint}`, { username, password });
    localStorage.setItem(tokenKey, jwt);
};

const loginWithJwt = (jwt) => {
    console.log(jwt);
    localStorage.setItem(tokenKey, jwt);
};

const logout = () => {
    httpService.removeJwt();
    localStorage.removeItem(tokenKey);
};

function getJwt() {
    return localStorage.getItem(tokenKey);
}

const service = { login, logout, loginWithJwt };
export default service;
