import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [currentWeather, setCurrentWeather] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [locationMatches, setLocationMatches] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get(`current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=Colombo`);
            const history = await axiosInstance.get(`forecast.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=Colombo&days=7`);
            console.log(data);
            setCurrentWeather(data?.current);
            console.log('7 days: ', history);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    const searchByLocation = async (e) => {
        e.preventDefault();

        try {
            // setLoading(true);
            const { data } = await axiosInstance.get(`search.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${searchQuery}`);
            console.log(searchQuery);
            console.log('search: ', data);
            setLocationMatches(data);
        } catch (err) {
            console.log(err.message);
        } finally {
            // setLoading(false);
        }
    }

    const fetchSearchedWeather = async (id) => {
        try {
            const { data } = await axiosInstance.get(`current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=id:${id}`);
            console.log('query', data);
        } catch (err) {
            console.log(err.message);
        }
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
                        <input type="text" placeholder="search by location" required onChange={(e) => setSearchQuery(e.target.value)}/>
                        <input type="submit" value="Search" />
                    </form>
                </div> 

                <div>
                    Location matches: 
                    {locationMatches.length > 0 && (
                        locationMatches.map(((location, index) => (
                            <div key={index}>
                                {location?.name}, {location?.country} | &nbsp;   
                                <button onClick={() => fetchSearchedWeather(location?.id)}>View weather</button>
                            </div>
                        )))
                    )}
                </div>

                <div>
                    Current weather: {currentWeather?.condition?.text} <br />
                    <img src={currentWeather?.condition?.icon} alt={currentWeather?.condition?.text} /> <br />
                    teamperature: {currentWeather?.temp_c} C <br />
                    humidity: {currentWeather?.humidity} <br />
                    wind speed: {currentWeather?.wind_kph} Kph <br />
                    uv index: {currentWeather?.uv} <br />
                    last updated: {currentWeather?.last_updated}
                </div>
            </div>
        )}
        </>
    );
}
 
export default Home;