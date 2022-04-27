import { createSlice } from '@reduxjs/toolkit';
import moviesService from '../services/moviesService';
import genresService from '../services/genresService';
import { paginate } from '../components/commons/utils/paginate';

const storeSlice = createSlice({
    name: 'videoStore',
    initialState: {
        movies: {
            list: [],
            paginatedList: [],
            currentPage: 1,
            pageSize: 3,
            selectedGenre: ''
        },
        genres: {
            list: []
        }
    },
    reducers: {
        moviesLoaded: (state, action) => {
            state.movies.list = action.payload;
            state.movies.totalMovies = state.movies.list.length;
        },
        moviesPaginated: (state, action) => {
            state.movies.paginatedList = action.payload.paginatedMovies;
        },
        currentPageSetted: (state, action) => {
            state.movies.currentPage = action.payload.currentPage;
        },
        currentGenreSetted: (state, action) => {
            state.movies.selectedGenre = action.payload.selectedGenre;
        },
        genresLoaded: (state, action) => {
            state.genres.list = [{ _id: '', name: 'Select a Genre' }, ...action.payload];
        }
    }
});

//#region Action Creators
export const getMovies = () => async (dispatch) => {
    const movies = await moviesService.getMovies();
    dispatch(moviesLoaded(movies));
};
export const setPaginatedMovies = () => (dispatch, getState) => {
    const { list: moviesList, pageSize, currentPage } = getState().movies;
    const paginatedMovies = paginate(moviesList, pageSize, currentPage);
    dispatch({ type: moviesPaginated.type, payload: { paginatedMovies } });
};
export const getGenres = () => async (dispatch) => {
    const genres = await genresService.getGenres();
    dispatch(genresLoaded(genres));
};
export const setCurrentPage = (currentPage) => ({
    type: currentPageSetted.type,
    payload: { currentPage }
});
export const setCurrentGenre = (selectedGenre) => ({
    type: currentGenreSetted.type,
    payload: { selectedGenre }
});
//#endregion

const { moviesLoaded, genresLoaded, currentPageSetted, moviesPaginated, currentGenreSetted } =
    storeSlice.actions;
export default storeSlice.reducer;
