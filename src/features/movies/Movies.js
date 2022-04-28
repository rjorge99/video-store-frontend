import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    currentPageSetted,
    filterMovies,
    getGenres,
    getMovies,
    searchQueryChanged,
    selectedGenreSetted
} from '../../app/storeSlice';
import { ListGroup } from '../../commons/components/ListGroup';
import { Pagination } from '../../commons/components/Pagination';
import { SearchBox } from '../../commons/components/SearchBox';
import { MoviesTable } from './MoviesTable';

export const Movies = () => {
    const dispatch = useDispatch();
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
        console.log(movie);
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
                <Link className='btn btn-primary' to='/movies/new'>
                    New Movie
                </Link>
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
