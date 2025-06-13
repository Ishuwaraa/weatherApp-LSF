const express = require('express');
const router = express.Router();
const weather = require('../controllers/weatherController');

//current weather
router.get('/:location', weather.currentWeather);

//forecast
router.get('/forecast/:location', weather.forecastWeather);

//search
router.get('/search/:location', weather.searchLocation);

module.exports = router;