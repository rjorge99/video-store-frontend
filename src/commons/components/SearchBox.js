export const SearchBox = ({ value, onChange }) => {
    return (
        <input
            type='text'
            className='form-control'
            placeholder='Search'
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};
