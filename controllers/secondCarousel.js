const debug = require('debug')('controllers:secondCarousel');

const {
  accounts,
} = require('./accounts.json');

const {
  paginate,
} = require('../utils/paginate');

exports.secondCarousel = async (req, res) => {
  debug('secondCarousel called');
  try {
    const {
      page,
    } = req.query;

    const accountsFilterByVoucher = accounts.filter((item) => {
      if (item.haveVoucher === true) {
        return item;
      }
      return null;
    });
    const sortAccounts = accountsFilterByVoucher.sort((a, b) => a.name - b.name);
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
