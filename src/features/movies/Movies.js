import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { SearchBox } from '../../commons/SearchBox';

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
                <SearchBox value={searchQuery} onChange={onSearchChange} />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovies.map((movie) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
