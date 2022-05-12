import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    currentPageSetted,
    deleteMovie,
    filterMovies,
    getGenres,
    getMovies,
    searchQueryChanged,
    selectedGenreSetted
} from '../app/storeSlice';
import { ListGroup } from './commons/ListGroup';
import { Pagination } from './commons/Pagination';
import { SearchBox } from './commons/SearchBox';
import { MoviesTable } from './MoviesTable';

export const Movies = () => {
    const dispatch = useDispatch();
    const { loggedIn } = useSelector((state) => state.auth);

    const {
        list: movies,
        filteredList: filteredMovies,
        listCount,
        currentPage,
        pageSize,
        selectedGenre,
        searchQuery
    } = useSelector((state) => state.movies);

    const { list: genres } = useSelector((state) => state.genres);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        dispatch(filterMovies());
    }, [dispatch, movies, currentPage, selectedGenre, searchQuery]);

    const onPageChange = (page) => {
        dispatch(currentPageSetted(page));
    };

    const onGenreSelect = (genre) => {
        dispatch(selectedGenreSetted(genre._id));
    };

    const onSearchChange = (value) => {
        dispatch(searchQueryChanged(value));
    };

    const handleDeleteMovie = (movie) => {
        dispatch(deleteMovie(movie._id));
    };

    return (
        <div className='row my-3'>
            <div className='col-4'>
                <ListGroup
                    items={genres}
                    onItemSelect={onGenreSelect}
                    selectedItem={selectedGenre}
                />
            </div>
            <div className='col-8'>
                {loggedIn && (
                    <Link className='btn btn-primary' to='/movies/new'>
                        New Movie
                    </Link>
                )}
                <SearchBox
                    className='my-3 form-control'
                    value={searchQuery}
                    onChange={onSearchChange}
                />
                <MoviesTable movies={filteredMovies} handleDelete={handleDeleteMovie} />
                <Pagination
                    currentPage={currentPage}
                    totalItems={listCount}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};
