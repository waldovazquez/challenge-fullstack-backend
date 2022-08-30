const debug = require('debug')('controllers:firstCarousel');

const {
  accounts,
} = require('./accounts.json');

const {
  paginate,
} = require('../utils/paginate');

exports.firstCarousel = async (req, res) => {
  debug('firstCarousel called');
  try {
    const {
      query,
      page,
    } = req.body;

    const accountsFilterByTourism = accounts.filter((item) => {
      if (item.tags.length > 0) {
        return item.tags[0].name === query;
      }
      return null;
    });
    const sortAccounts = accountsFilterByTourism
      .map((item) => ({
        ...item,
        branches: item.branches.sort((a, b) => a.location - b.location),
        benefits: item.benefits.sort((a, b) => Number(a.type.slice(0, 2)) - Number(b.type.slice(0, 2))),
      }))
      .sort((a, b) => a.branches[0].location - b.branches[0].location);
    const accountsReturned = paginate(sortAccounts, page);
    return res.status(200).json(accountsReturned);
  } catch (e) {
    console.info('Error', e);
    res.status(500).json({
      message: 'An error occurred',
    });
  }
  return null;
};
