import { createSlice } from '@reduxjs/toolkit';
import moviesService from '../services/moviesService';
import genresService from '../services/genresService';

const storeSlice = createSlice({
    name: 'videoStore',
    initialState: {
        movies: {
            list: [],
            totalMovies: 0,
            currentPage: 1,
            pageSize: 3
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
        currentPageSetted: (state, action) => {
            state.movies.currentPage = action.payload.currentPage;
        },
        genresLoaded: (state, action) => {
            state.genres.list = action.payload;
        }
    }
});

//#region Action Creators
export const getMovies = () => async (dispatch) => {
    const movies = await moviesService.getMovies();
    dispatch(moviesLoaded(movies));
};
export const getGenres = () => async (dispatch) => {
    const genres = await genresService.getGenres();
    dispatch(genresLoaded(genres));
};
export const setCurrentPage = (currentPage) => ({
    type: currentPageSetted.type,
    payload: { currentPage }
});
//#endregion

export const { moviesLoaded, genresLoaded, currentPageSetted } = storeSlice.actions;
export default storeSlice.reducer;
