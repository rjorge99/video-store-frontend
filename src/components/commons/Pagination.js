import _ from 'lodash';
import PropTypes from 'prop-types';

export const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const pages = _.range(1, totalPages + 1);

    return (
        <nav>
            <ul className='pagination'>
                {pages.map((page) => (
                    <li
                        onClick={() => onPageChange(page)}
                        key={page}
                        className={`page-item clickable ${page === currentPage && 'active'}`}>
                        <span className='page-link'>{page}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
