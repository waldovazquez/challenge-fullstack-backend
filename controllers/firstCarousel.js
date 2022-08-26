const debug = require('debug')('controllers:firstCarousel');

const {
  accounts,
} = require('./accounts.json');

exports.firstCarousel = async (_req, res) => {
  debug('firstCarousel called');
  try {
    const accountsFilterByTourism = accounts.filter((item) => {
      if (item.tags.length > 0) {
        return item.tags[0].name === 'Turismo en Buenos Aires';
      }
      return null;
    });
    const sortAccounts = accountsFilterByTourism
      .map((item) => ({
        id: item.id,
        branches: item.branches.sort((a, b) => a.location - b.location),
      }))
      .sort((a, b) => a.branches[0].location - b.branches[0].location)
      .map((item) => accountsFilterByTourism.find((secondItem) => item.id === secondItem.id));
    const accountsReturned = sortAccounts.slice(0, 4);
    return res.status(200).json(accountsReturned);
  } catch (e) {
    console.info('Error', e);
    res.status(500).json({
      message: 'An error occurred',
    });
  }
  return null;
};
