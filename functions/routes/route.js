const { createCountries, getCountries } = require('../controllers/controller');
const express = require('express');
const router = express.Router();

router.route('/').get(getCountries).post(createCountries);

module.exports = router;
