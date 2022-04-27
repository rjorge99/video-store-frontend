import _ from 'lodash';

export const paginate = (items, pageSize, currentPage) => {
    return _(items)
        .slice((currentPage - 1) * pageSize)
        .take(pageSize)
        .value();
};
