import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from '../../commons/components/Table';

export const MoviesTable = ({ movies, handleDelete }) => {
    const { user } = useSelector((state) => state);
    const columns = [
        {
            path: 'title',
            label: 'Title',
            content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' }
    ];

    if (user)
        columns.push({
            key: 'delete',
            label: '',
            content: (movie) => (
                <button className='btn btn-danger btn-sm' onClick={() => handleDelete(movie)}>
                    Delete
                </button>
            )
        });

    return <Table data={movies} columns={columns} />;
};
