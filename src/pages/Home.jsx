import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [currentWeather, setCurrentWeather] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [locationMatches, setLocationMatches] = useState([]);
    const [forecastData, setForecastData] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const colomboWeather = await axiosInstance.get(`current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=Colombo`);
            const forecastWeather = await axiosInstance.get(`forecast.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=Colombo&days=7`);
            console.log(colomboWeather?.data);
            console.log('forecast: ', forecastWeather?.data?.forecast?.forecastday);
            setCurrentWeather(colomboWeather?.data?.current);
            setForecastData(forecastWeather?.data?.forecast?.forecastday);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    const searchByLocation = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            setSearchLoading(true);
            const { data } = await axiosInstance.get(`search.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${searchQuery}`);
            console.log(searchQuery);
            console.log('search: ', data);
            setLocationMatches(data);
        } catch (err) {
            console.log(err.message);
        } finally {
            setSearchLoading(false);
        }
    }

    const fetchSearchedWeather = async (location) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get(`current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=id:${location?.id}`);
            const forecastWeather = await axiosInstance.get(`forecast.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=id:${location?.id}&days=7`);
            console.log('query', data);
            console.log('search forecast: ', forecastWeather?.data);
            setCurrentWeather(data?.current);
            setForecastData(forecastWeather?.data?.forecast?.forecastday);
            setSelectedLocation(location);
            setLocationMatches([]);
            setSearchQuery('');
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    const resetToDefaultWeather = () => {
        setSelectedLocation(null);
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [])

    return ( 
        <>
        {loading ? (
            <div>loading...</div>
        ) : (
            <div>
                <div>
                    <form onSubmit={(e) => searchByLocation(e)}>
                        <input type="text" placeholder="search by location" required value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        <input type="submit" value={searchLoading ? "Searching..." : "Search"} disabled={searchLoading}/>
                    </form>
                </div> 

                <div>
                    {locationMatches.length > 0 && (
                        <div>
                            Location matches: 
                            {locationMatches.map(((location, index) => (
                                <div key={index}>
                                    {location?.name}, {location?.country} | &nbsp;   
                                    <button onClick={() => fetchSearchedWeather(location)}>View weather</button>
                                </div>
                            )))}
                        </div>
                    )}
                </div>

                <div>
                    {selectedLocation ? `${selectedLocation?.name}, ${selectedLocation?.country}` : 'Colombo, Sri Lanka'}<br />
                    {selectedLocation && (
                        <button
                            onClick={resetToDefaultWeather}
                        >
                            Back to Colombo
                        </button>
                    )}
                    <br />
                    Current weather: {currentWeather?.condition?.text} <br />
                    <img src={currentWeather?.condition?.icon} alt={currentWeather?.condition?.text} /> <br />
                    teamperature: {currentWeather?.temp_c} °C <br />
                    humidity: {currentWeather?.humidity} <br />
                    wind speed: {currentWeather?.wind_kph} Kph <br />
                    uv index: {currentWeather?.uv} <br />
                    last updated: {currentWeather?.last_updated}
                </div><br />

                <div>
                    7 day forecast
                    {forecastData.length > 0 && 
                        forecastData.map((forecast, index) => (
                            <div key={index} className=" mb-10">
                                <p>{forecast?.date} | {forecast?.day?.condition?.text}</p>
                                <img src={forecast?.day?.condition?.icon} alt={forecast?.day?.condition?.text} /> <br />
                                teamperature: min {forecast?.day?.mintemp_c} °C | max {forecast?.day?.maxtemp_c} °C<br />
                                humidity: {forecast?.day?.avghumidity} <br />
                                uv index: {forecast?.day?.uv} <br />
                            </div>
                        ))
                    }
                </div>
            </div>
        )}
        </>
    );
}
 
export default Home;