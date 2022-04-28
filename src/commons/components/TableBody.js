import _ from 'lodash';
export const TableBody = ({ columns, data }) => {
    const renderCell = (item, column) => {
        return _.get(item, column.path);
    };
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {columns.map((column) => (
                        <td key={column.path}>{renderCell(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};
