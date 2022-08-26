const express = require('express');

const router = express.Router();

const {
  secondCarousel,
} = require('../controllers/secondCarousel');

router.route('/second').get(secondCarousel);

module.exports = router;
