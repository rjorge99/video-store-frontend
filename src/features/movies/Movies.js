import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    filterMovies,
    getGenres,
    getMovies,
    setCurrentPage,
    setSelectedGenre
} from '../../app/storeSlice';
import { ListGroup } from '../../commons/components/ListGroup';
import { Pagination } from '../../commons/components/Pagination';

export const Movies = () => {
    const dispatch = useDispatch();
    const {
        list: movies,
        filteredList: filteredMovies,
        currentPage,
        pageSize,
        selectedGenre,
        queryString
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
    }, [dispatch, movies, currentPage]);

    const onPageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    const onGenreSelect = (genre) => {
        dispatch(setSelectedGenre(genre._id));
    };

    return (
        <div className='row my-3'>
            <div className='col-4'>
                <ListGroup
                    items={genres}
                    textProperty='name'
                    valueProperty='_id'
                    onItemSelect={onGenreSelect}
                    selectedItem={selectedGenre}
                />
            </div>
            <div className='col-8'>
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
                    totalItems={movies.length}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};
