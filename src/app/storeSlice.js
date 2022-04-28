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
            listCount: 0,
            currentPage: 1,
            pageSize: 4,
            selectedGenre: '',
            searchQuery: ''
        },
        genres: {
            list: []
        }
    },
    reducers: {
        moviesLoaded: (state, action) => {
            state.movies.list = action.payload;
            state.movies.filteredList = action.payload;
        },
        moviesFiltered: (state, action) => {
            state.movies.filteredList = action.payload.filteredMovies;
            state.movies.listCount = action.payload.listCount;
        },
        currentPageSetted: (state, action) => {
            state.movies.currentPage = action.payload.currentPage;
        },
        selectedGenreSetted: (state, action) => {
            state.movies.selectedGenre = action.payload.genre;
            state.movies.currentPage = 1;
            state.searchQuery = '';
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

export const getGenres = () => async (dispatch) => {
    const genres = await genresService.getGenres();
    dispatch(genresLoaded(genres));
};

export const setCurrentPage = (currentPage) => ({
    type: currentPageSetted.type,
    payload: { currentPage }
});

export const setSelectedGenre = (genre) => (dispatch, getState) => {
    dispatch({ type: selectedGenreSetted.type, payload: { genre } });
};

export const filterMovies = () => (dispatch, getState) => {
    let {
        selectedGenre,
        list: filteredMovies,
        searchQuery,
        pageSize,
        currentPage
    } = getState().movies;

    if (selectedGenre)
        filteredMovies = filteredMovies.filter((movie) => movie.genre._id === selectedGenre);

    const movies = paginate(filteredMovies, pageSize, currentPage);

    dispatch({
        type: moviesFiltered.type,
        payload: { filteredMovies: movies, listCount: filteredMovies.length }
    });
};
//#endregion

const { moviesLoaded, genresLoaded, currentPageSetted, moviesFiltered, selectedGenreSetted } =
    storeSlice.actions;
export default storeSlice.reducer;
