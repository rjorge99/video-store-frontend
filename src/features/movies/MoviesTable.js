import { Table } from '../../commons/components/Table';

export const MoviesTable = ({ movies }) => {
    const columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' }
    ];

    return <Table data={movies} columns={columns} />;
};
