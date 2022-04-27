import http from './httpService';

const endpoint = 'http://localhost:9000/api/movies';

export const getMovies = async () => {
    const { data } = await http.get(endpoint);
    return data;
};

const service = { getMovies };
export default service;
