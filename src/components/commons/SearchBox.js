export const SearchBox = ({ onChange, ...props }) => {
    return (
        <input
            {...props}
            type='text'
            placeholder='Search'
            onChange={(e) => onChange(e.target.value)}
        />
    );
};
