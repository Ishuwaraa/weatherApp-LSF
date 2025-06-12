import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Search, MapPin } from 'lucide-react';
import ForeCastCard from "../components/ForecastCard";
import CurrentWeatherCard from "../components/CurrentWeatherCard";

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

            if (data?.length === 0) {
                alert('No results found!')
            }
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    useEffect(() => {
        fetchData();
    }, [])

    return ( 
        <>
        {loading ? (
            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                    <p className="text-white text-xl font-medium">Loading...</p>
                </div>
            </div>
        ) : (            
            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
                <div className="max-w-6xl mx-auto">                    
                    <div className="text-center mb-8">
                        <p className="text-4xl font-bold text-white mb-2">Weather App</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl">
                        <form onSubmit={(e) => searchByLocation(e)} className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search by location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500"
                                    required
                                />
                            </div>
                            <input 
                                type="submit" 
                                value={searchLoading ? "Searching..." : "Search"} 
                                disabled={searchLoading}
                                className="px-6 py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/20"
                            />
                        </form>
                        
                        {locationMatches.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <p className="text-white/80 font-medium">Location matches:</p>
                                {locationMatches.map((location, index) => (
                                    <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-white/70" />
                                            <span className="text-white">{location?.name}, {location?.country}</span>
                                        </div>
                                        <button
                                            onClick={() => fetchSearchedWeather(location)}
                                            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all duration-200"
                                        >
                                            View Weather
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-6 w-6 text-white" />
                            <h2 className="text-2xl font-bold text-white">
                                {selectedLocation ? `${selectedLocation.name}, ${selectedLocation.country}` : 'Colombo, Sri Lanka'}
                            </h2>
                        </div>
                        {selectedLocation && (
                            <button
                                onClick={resetToDefaultWeather}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all duration-200"
                            >
                                Back to Colombo
                            </button>
                        )}
                    </div>
                    
                    <CurrentWeatherCard 
                        icon = {currentWeather?.condition?.icon} 
                        text = {currentWeather?.condition?.text} 
                        lastUpdated = {currentWeather?.last_updated} 
                        temp = {currentWeather?.temp_c} 
                        humidity = {currentWeather?.humidity} 
                        wind = {currentWeather?.wind_kph} 
                        uv = {currentWeather?.uv}
                    />                    

                    {forecastData.length && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6">7-Day Forecast</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                                {forecastData.map((forecast, index) => (
                                    <ForeCastCard 
                                        key={index}
                                        index={index}
                                        date={formatDate(forecast?.date)} 
                                        icon={forecast?.day?.condition?.icon} 
                                        text={forecast?.day?.condition?.text} 
                                        minTemp={forecast?.day?.mintemp_c} 
                                        maxTemp={forecast?.day?.maxtemp_c} 
                                        humidity={forecast?.day?.avghumidity} 
                                        uv={forecast?.day?.uv}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        )}
        </>
    );
}
 
export default Home;