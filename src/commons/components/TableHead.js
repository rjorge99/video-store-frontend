export const TableHead = ({ columns }) => {
    return (
        <thead>
            <tr>
                {columns.map((column) => (
                    <th key='column.path'>{column.label}</th>
                ))}
            </tr>
        </thead>
    );
};
