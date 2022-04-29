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
            pageSize: 5,
            selectedGenre: '',
            searchQuery: '',
            loadedMovie: null
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
        movieDeleted: (state, action) => {
            state.movies.list = state.movies.list.filter((movie) => movie._id !== action.payload);
        },
        moviesFiltered: (state, action) => {
            state.movies.filteredList = action.payload.filteredMovies;
            state.movies.listCount = action.payload.listCount;
        },
        currentPageSetted: (state, action) => {
            state.movies.currentPage = action.payload;
        },
        searchQueryChanged: (state, action) => {
            state.movies.searchQuery = action.payload;
            state.movies.currentPage = 1;
            state.movies.selectedGenre = '';
        },
        stateRestored: (state, action) => {
            state.movies.list = action.payload;
        },
        selectedGenreSetted: (state, action) => {
            state.movies.selectedGenre = action.payload;
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

export const deleteMovie = (id) => async (dispatch, getState) => {
    const { list: originalMoviesState } = getState().movies;

    try {
        dispatch(movieDeleted(id));
        await moviesService.deleteMovie(id);
    } catch (err) {
        dispatch(stateRestored(originalMoviesState));
    }
};

export const filterMovies = () => (dispatch, getState) => {
    const { selectedGenre, searchQuery, pageSize, currentPage } = getState().movies;
    let { list: filteredMovies } = getState().movies;

    if (searchQuery)
        filteredMovies = filteredMovies.filter((movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

    if (selectedGenre)
        filteredMovies = filteredMovies.filter((movie) => movie.genre._id === selectedGenre);

    const movies = paginate(filteredMovies, pageSize, currentPage);

    dispatch(moviesFiltered({ filteredMovies: movies, listCount: filteredMovies.length }));
};
//#endregion

const { moviesLoaded, genresLoaded, moviesFiltered, movieDeleted, stateRestored } =
    storeSlice.actions;
export const { searchQueryChanged, currentPageSetted, selectedGenreSetted } = storeSlice.actions;
export default storeSlice.reducer;
