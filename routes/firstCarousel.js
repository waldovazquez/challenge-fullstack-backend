const express = require('express');

const router = express.Router();

const {
  firstCarousel,
} = require('../controllers/firstCarousel');

router.route('/first').get(firstCarousel);

module.exports = router;
