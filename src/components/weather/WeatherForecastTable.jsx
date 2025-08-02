import React from "react";
import {
  MapPin,
  CloudSun,
  ThermometerSun,
  ThermometerSnowflake,
  ThermometerIcon,
  Droplets,
  Wind,
  CloudDrizzle,
  Radiation,
  AlertTriangle,
  Calendar1Icon,
} from "lucide-react";

// Reusable fallback component
const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-600 flex flex-col items-center gap-2 py-12">
    <AlertTriangle size={32} />
    <p className="text-lg">{message}</p>
  </div>
);
function formatLocation(location) {
  return location
    .split(",")
    .map((part) =>
      part
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .join(", ");
}
const WeatherForecastTable = ({
  forecastData,
  fetchedLocation = localStorage.getItem("fetchedLocation") ||
    "Unknown Location",
  isLoading = false,
  isError = false,
  handleResetLocation,
}) => {
  console.log("WeatherForecastTable rendered with data:", forecastData);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-emerald-100 to-green-100 p-4 sm:p-6 lg:p-16">
      <div className="w-full max-w-6xl bg-white/90 shadow-2xl rounded-3xl border border-green-200 p-4 sm:p-6 lg:p-12 backdrop-blur-sm">
        {/* Location Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent flex items-center gap-2">
            <MapPin size={28} className="text-green-600" />
            <span className="ml-1 underline">
              {formatLocation(fetchedLocation)}
            </span>
          </h2>
        </div>

        {/* Handle error */}
        {isError && (
          <ErrorMessage message="Failed to load weather data. Please try again later." />
        )}

        {/* Handle loading */}
        {isLoading && (
          <div className="text-center text-gray-500 py-12 text-lg font-medium">
            Loading forecast...
          </div>
        )}

        {/* Handle empty data */}
        {!isLoading &&
          !isError &&
          (!forecastData || forecastData.length === 0) && (
            <div className="text-center text-gray-500 py-12 text-lg font-medium">
              No forecast data available.
            </div>
          )}

        {/* Render forecast table */}
        {!isLoading && !isError && forecastData && forecastData.length > 0 && (
          <>
            {/* Large screen table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-green-200 to-emerald-300 text-green-900 text-lg font-semibold">
                    <th className="p-4 rounded-tl-2xl">Date</th>
                    <th className="p-4">
                      <ThermometerSun size={20} className="inline mr-1" />
                      Max Temp
                    </th>
                    <th className="p-4">
                      <ThermometerSnowflake size={20} className="inline mr-1" />
                      Min Temp
                    </th>
                    <th className="p-4">
                      <ThermometerIcon size={20} className="inline mr-1" />
                      Avg Temp
                    </th>
                    <th className="p-4">
                      <Droplets size={20} className="inline mr-1" />
                      Humidity
                    </th>
                    <th className="p-4">
                      <Wind size={20} className="inline mr-1" />
                      Wind
                    </th>
                    <th className="p-4">
                      <CloudDrizzle size={20} className="inline mr-1" />
                      Rain
                    </th>
                    <th className="p-4">
                      <Radiation size={20} className="inline mr-1" />
                      UV
                    </th>
                    <th className="p-4 rounded-tr-2xl">
                      <CloudSun size={20} className="inline mr-1" />
                      Cloud Cover
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {forecastData.map((entry, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-green-50"
                      } text-gray-700 text-base hover:bg-emerald-100/40 transition-colors`}
                    >
                      <td className="p-4 font-medium">{entry.date}</td>
                      <td className="p-4">{entry.max_temp}°C</td>
                      <td className="p-4">{entry.min_temp}°C</td>
                      <td className="p-4">{entry.mean_temp}°C</td>
                      <td className="p-4">{entry.humidity}%</td>
                      <td className="p-4">{entry.wind_speed} km/h</td>
                      <td className="p-4">{entry.rain} mm</td>
                      <td className="p-4">{entry.uv_index}</td>
                      <td className="p-4">{entry.cloud_cover}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view cards */}
            <div className="sm:hidden space-y-4 mt-4">
              {forecastData.map((entry, idx) => (
                <div
                  key={idx}
                  className="border border-green-200 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="text-lg font-semibold mb-2 text-green-800">
                    <Calendar1Icon size={18} /> {entry.date}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <span>
                      {" "}
                      <ThermometerSun size={16} /> Max: {entry.max_temp}°C
                    </span>
                    <span>
                      {" "}
                      <ThermometerSnowflake size={16} /> Min: {entry.min_temp}°C
                    </span>
                    <span>
                      {" "}
                      <ThermometerIcon size={16} /> Avg: {entry.mean_temp}°C
                    </span>
                    <span>
                      <Droplets size={16} /> Humidity: {entry.humidity}%
                    </span>
                    <span>
                      <Wind size={16} /> Wind: {entry.wind_speed} km/h
                    </span>
                    <span>
                      <CloudDrizzle size={16} /> Rain: {entry.rain} mm
                    </span>
                    <span>
                      <Radiation size={16} /> UV: {entry.uv_index}
                    </span>
                    <span>
                      <CloudSun size={16} /> Cloud: {entry.cloud_cover}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <button
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={handleResetLocation}
        >
          Reset Location
        </button>
      </div>
    </div>
  );
};

export default WeatherForecastTable;
