import http from './httpService';

const endpoint = 'http://localhost:9000/api/movies';

const getMovies = async () => {
    const { data } = await http.get(endpoint);
    return data;
};

const getMovie = async (id) => {
    return await http.get(`${endpoint}/${id}`);
};

const deleteMovie = async (id) => {
    return await http.delete(`${endpoint}/${id}`);
};

const service = { getMovies, getMovie, deleteMovie };
export default service;
