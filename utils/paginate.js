exports.paginate = (array, page) => array.slice((page * 4) - 4, page * 4);
