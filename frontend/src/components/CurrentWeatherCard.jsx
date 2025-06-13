import { Thermometer, Droplets, Wind, Sun, Clock } from 'lucide-react';

const CurrentWeatherCard = ({ icon, text, lastUpdated, temp, humidity, wind, uv }) => {
    return ( 
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <img 
                            src={icon} 
                            alt={text}
                            className="h-16 w-16"
                        />
                        <div>
                            <div className="text-5xl font-bold text-white">{temp}°C</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-white/70">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Last updated: {lastUpdated}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Thermometer className="h-5 w-5 text-orange-300" />
                            <span className="text-white/80 text-sm">Feels like</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{temp}°C</div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Droplets className="h-5 w-5 text-blue-300" />
                            <span className="text-white/80 text-sm">Humidity</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{humidity}%</div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Wind className="h-5 w-5 text-gray-300" />
                            <span className="text-white/80 text-sm">Wind Speed</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{wind} kph</div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Sun className="h-5 w-5 text-yellow-300" />
                            <span className="text-white/80 text-sm">UV Index</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{uv}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CurrentWeatherCard;