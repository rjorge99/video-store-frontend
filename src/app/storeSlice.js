import { createSlice } from '@reduxjs/toolkit';
import moviesService from '../services/moviesService';
import genresService from '../services/genresService';
import { paginate } from '../components/commons/utils/paginate';

const storeSlice = createSlice({
    name: 'videoStore',
    initialState: {
        movies: {
            list: [],
            filteredList: [],
            currentPage: 1,
            pageSize: 4,
            selectedGenre: '',
            queryString: ''
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
        moviesFiltered: (state, action) => {
            state.movies.filteredList = action.payload.filteredMovies;
        },
        currentPageSetted: (state, action) => {
            state.movies.currentPage = action.payload.currentPage;
        },
        selectedGenreSetted: (state, action) => {
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
export const filterMovies = () => (dispatch, getState) => {
    const { list: movies, pageSize, currentPage } = getState().movies;
    const filteredMovies = paginate(movies, pageSize, currentPage);
    dispatch({ type: moviesFiltered.type, payload: { filteredMovies } });
};
export const getGenres = () => async (dispatch) => {
    const genres = await genresService.getGenres();
    dispatch(genresLoaded(genres));
};
export const setCurrentPage = (currentPage) => ({
    type: currentPageSetted.type,
    payload: { currentPage }
});
export const setSelectedGenre = (selectedGenre) => ({
    type: selectedGenreSetted.type,
    payload: { selectedGenre }
});
//#endregion

const { moviesLoaded, genresLoaded, currentPageSetted, moviesFiltered, selectedGenreSetted } =
    storeSlice.actions;
export default storeSlice.reducer;
