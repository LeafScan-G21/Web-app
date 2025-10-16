import { Cloud } from "lucide-react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React from "react";
import sunnyAnim from "../../assets/weather/sunny.json";
import rainAnim from "../../assets/weather/rainy.json";
import cloudyAnim from "../../assets/weather/cloudy.json";

const getWeatherAnimation = (current_rain) => {
  if (current_rain>=90) return rainAnim;
  if (current_rain>70) return cloudyAnim;
  return sunnyAnim; 
};

export default function WeatherCard({ loading, weatherData }) {
  const animationData = weatherData ? getWeatherAnimation(weatherData.current_rain) : null;

  return (
    <motion.div
      className="bg-green-30 backdrop-blur-md rounded-2xl p-6 shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {loading ? (
        <div className="text-gray-500 text-center">Loading weather...</div>
      ) : weatherData ? (
        <div className="flex flex-col items-center gap-4">
          {/* Animated Weather Icon */}
          {animationData && (
            <motion.div
              className="w-20 h-20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Lottie animationData={animationData} loop={true} />
            </motion.div>
          )}

          {/* Temperature */}
          <div className="text-4xl font-bold text-gray-900">
            {weatherData.current_temperature.toFixed(1)}°C
          </div>

          {/* Secondary details */}
          <div className="flex items-center gap-2 text-gray-600">
            <Cloud className="w-5 h-5" />
            <div>{weatherData.current_relative_humidity}% humidity</div>
          </div>

          {/* Info cards */}
          <div className="mt-3 w-full grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/40 text-center shadow-sm">
              <div className="text-xs text-gray-500">Rain Precipitation</div>
              <div className="font-medium text-gray-900">
                {weatherData.current_rain} %
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/40 text-center shadow-sm">
              <div className="text-xs text-gray-500">Humidity</div>
              <div className="font-medium text-gray-900">
                {weatherData.current_relative_humidity}%
              </div>
            </div>
          </div>

          
        </div>
      ) : (
        <div className="text-gray-500 text-center">Weather data not available</div>
      )}
    </motion.div>
  );
}
