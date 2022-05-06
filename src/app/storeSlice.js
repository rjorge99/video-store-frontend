import _ from 'lodash';
import authService from '../services/authService';
import genresService from '../services/genresService';
import jwtDecode from 'jwt-decode';
import moviesService from '../services/moviesService';
import userService from '../services/userService';
import { createSlice } from '@reduxjs/toolkit';
import { paginate } from '../commons/utils/paginate';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const storeSlice = createSlice({
    name: 'videoStore',
    initialState: {
        auth: {
            user: null,
            loggedIn: false
        },
        movies: {
            list: [],
            filteredList: [],
            listCount: 0,
            currentPage: 1,
            pageSize: 3,
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
        },
        userLoggedIn: (state, action) => {
            state.auth.user = action.payload;
            state.auth.loggedIn = true;
        },
        userLoggedOut: (state, action) => {
            state.auth.user = null;
            state.auth.loggedIn = false;
        }
    }
});

//#region Action Creators
export const getMovies = () => async (dispatch) => {
    const movies = await moviesService.getMovies();
    dispatch(moviesLoaded(movies));
};
export const saveMovie = (movie) => (dispatch) => {
    return new Promise(async (resolved, reject) => {
        try {
            await moviesService.saveMovie(movie);
            resolved();
        } catch (error) {
            toast.error(error.response.data);
            reject(error);
        }
    });
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
        toast.error(err.response.data);
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

    const sorted = _.orderBy(filteredMovies, 'title', 'asc');

    const movies = paginate(sorted, pageSize, currentPage);

    dispatch(moviesFiltered({ filteredMovies: movies, listCount: filteredMovies.length }));
};

export const login = (formData) => async (dispatch) => {
    try {
        const jwt = await authService.login(formData.username, formData.password);
        authService.setJwt(jwt);
        dispatch(userLoggedIn(jwtDecode(jwt)));
    } catch (error) {
        if (error.response.status === 400) toast.error(error.response.data);
    }
};
export const register = (formData) => async (dispatch) => {
    try {
        const response = await userService.register(
            formData.username,
            formData.email,
            formData.password
        );

        const jwt = response.headers['x-auth-token'];
        authService.loginWithJwt(jwt);
        dispatch(userLoggedIn(jwtDecode(jwt)));
    } catch (error) {
        if (error.response.status === 400) toast.error(error.response.data);
    }
};
export const logout = () => async (dispatch) => {
    authService.logout();
    dispatch(userLoggedOut());
};
export const loginWithJWT = (jwt) => async (dispatch) => {
    try {
        authService.setJwt(jwt);
        const { data: user } = await authService.validateToken(jwt);
        dispatch(userLoggedIn(user));
    } catch (error) {
        dispatch(userLoggedOut());
    }
};

//#endregion

const {
    moviesLoaded,
    genresLoaded,
    moviesFiltered,
    movieDeleted,
    stateRestored,
    userLoggedIn,
    userLoggedOut
} = storeSlice.actions;
export const { searchQueryChanged, currentPageSetted, selectedGenreSetted } = storeSlice.actions;
export default storeSlice.reducer;
