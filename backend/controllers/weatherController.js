const { default: axios } = require("axios");

const baseURL = 'http://api.weatherapi.com/v1';

const currentWeather = async (req, res) => {
    const location = req.params.location;
    const searchById = req.query.searchById === 'true';
    
    try {
        let weatherData;
        if (searchById) {
            weatherData = await axios.get(`${baseURL}/current.json?key=${process.env.WEATHER_KEY}&q=id:${location}`);
        } else {
            weatherData = await axios.get(`${baseURL}/current.json?key=${process.env.WEATHER_KEY}&q=Colombo`);
        }
        
        res.status(200).json(weatherData?.data);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const forecastWeather = async (req, res) => {
    const location = req.params.location;
    const searchById = req.query.searchById === 'true';
    
    try {
        let weatherData;
        if (searchById) {
            weatherData = await axios.get(`${baseURL}/forecast.json?key=${process.env.WEATHER_KEY}&q=id:${location}&days=7`);
        } else {
            weatherData = await axios.get(`${baseURL}/forecast.json?key=${process.env.WEATHER_KEY}&q=Colombo&days=7`);
        }
        
        res.status(200).json(weatherData?.data);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const searchLocation = async (req, res) => {
    const location = req.params.location;

    try {
        const weatherData = await axios.get(`${baseURL}/search.json?key=${process.env.WEATHER_KEY}&q=${location}`);

        res.status(200).json(weatherData?.data);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

module.exports = { currentWeather, forecastWeather, searchLocation }