const debug = require('debug')('controllers:secondCarousel');

const {
  accounts,
} = require('./accounts.json');

exports.secondCarousel = async (_req, res) => {
  debug('secondCarousel called');
  try {
    const accountsFilterByVoucher = accounts.filter((item) => {
      if (item.haveVoucher === true) {
        return item;
      }
      return null;
    });
    const sortAccounts = accountsFilterByVoucher
      .sort((a, b) => a.name.localeCompare(b.name));
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
