import PropTypes from 'prop-types';

export const ListGroup = ({ items, selectedItem, textProperty, valueProperty, onItemSelect }) => {
    return (
        <ul className='list-group'>
            {items.map((item) => (
                <li
                    key={item[valueProperty]}
                    className={`list-group-item clickable ${
                        selectedItem === item[valueProperty] && 'active'
                    }`}
                    onClick={() => onItemSelect(item)}>
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
};

ListGroup.propTypes = {
    items: PropTypes.array.isRequired,
    textProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired
};

ListGroup.defaultProps = {
    valueProperty: '_id',
    textProperty: 'name'
};
