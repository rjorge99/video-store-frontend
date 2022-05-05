import http from './httpService';

const endpoint = 'http://localhost:9000/api/movies';

const getMovies = async () => {
    const { data } = await http.get(endpoint);
    return data;
};

const getMovie = async (id) => {
    return await http.get(`${endpoint}/${id}`);
};

const saveMovie = async (movie) => {
    if (movie._id) {
        const { _id, ...body } = movie;
        return await http.post(`${endpoint}/${movie._id}`, body);
    } else return await http.post(`${endpoint}`, movie);
};

const deleteMovie = async (id) => {
    return await http.delete(`${endpoint}/${id}`);
};

const service = { getMovies, getMovie, deleteMovie, saveMovie };
export default service;
