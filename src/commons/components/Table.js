import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

export const Table = ({ data, columns }) => {
    return (
        <table className='table'>
            <TableHead columns={columns} />
            <TableBody columns={columns} data={data} />
        </table>
    );
};
