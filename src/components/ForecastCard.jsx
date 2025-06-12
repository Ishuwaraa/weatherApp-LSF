import { Droplets, Sun } from 'lucide-react';

const ForeCastCard = ({index, date, icon, text, minTemp, maxTemp, humidity, uv}) => {
    return ( 
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm hover:bg-white/20 transition-all duration-200">
            <div className="text-white/80 text-sm font-medium mb-2">
                {index === 0 ? 'Today' : date}
            </div>
            <img 
                src={icon} 
                alt={text}
                className="h-12 w-12 mx-auto mb-2"
            />
            <div className="text-white text-sm mb-1">{text}</div>
            <div className="flex justify-between text-sm">
                <span className="text-white font-medium">{minTemp}°C</span>
                <span className="text-white font-medium">{maxTemp} °C</span>
            </div>
            <div className="flex flex-col gap-3 pt-3">
                <div className="text-white text-sm mb-1 flex justify-center">
                    <Droplets className="h-5 w-5 text-blue-300" />
                    {humidity}
                </div>
                <div className="text-white text-sm mb-1 flex justify-center">
                    <Sun className="h-5 w-5 text-yellow-300" />
                    {uv}
                </div>
            </div>
        </div>
    );
}
 
export default ForeCastCard;