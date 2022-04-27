import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getMovies, setCurrentPage } from '../../app/storeSlice';
import { Pagination } from '../../commons/components/Pagination';

export const Movies = () => {
    const dispatch = useDispatch();
    const {
        list: movies,
        totalMovies,
        currentPage,
        pageSize
    } = useSelector((state) => state.movies);
    const { list: genres } = useSelector((state) => state.genres);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    const onPageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <div className='row my-3'>
            <div className='col-4'>
                <ul className='list-group'>
                    {genres.map((genre) => (
                        <li key={genre._id} className='list-group-item'>
                            {genre.name}
                        </li>
                    ))}
                </ul>
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
                        {movies.map((movie) => (
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
                    totalItems={totalMovies}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};
