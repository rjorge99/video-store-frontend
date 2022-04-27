import http from './httpService';

const endpoint = 'http://localhost:9000/api/genres';

const getGenres = async () => {
    const { data } = await http.get(endpoint);
    return data;
};

const service = { getGenres };
export default service;
