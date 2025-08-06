import React, { useEffect, useState } from "react";
import {
  MapPin,
  LocateFixed,
  CheckCircle,
  Loader,
  AlertTriangle,
} from "lucide-react";
import AddressInput from "../../components/weather/AddressInput";
import { getWeatherForecast } from "../../services/weather/forecast";
import WeatherForecastTable from "../../components/weather/WeatherForecastTable";

const GetLocation = () => {
  const [weatherDataFetched, setWeatherDataFetched] = useState(
    localStorage.getItem("weatherDataFetched") === "true"
  );
  const [weatherData, setWeatherData] = useState(null);
  const [fetchedLocation, setFetchedLocation] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(
    localStorage.getItem("locationFetched") === "true"
  );
  const [manualInput, setManualInput] = useState(false);
  const [address, setAddress] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setManualInput(true);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude || "N/A",
          lon: position.coords.longitude || "N/A",
        });
        setError(null);
        setLoading(false);
        setFetched(true);
        localStorage.setItem("locationFetched", "true");
        localStorage.setItem("latitude", position.coords.latitude);
        localStorage.setItem("longitude", position.coords.longitude);
      },
      (err) => {
        setError(`Permission denied or error occurred: ${err.message}`);
        localStorage.setItem("locationFetched", "false");
        setLocation(null);
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");
        setLoading(false);
        setFetched(true);
      }
    );
  };
  const handleResetLocation = () => {
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
    localStorage.removeItem("fetchedLocation");
    setWeatherDataFetched(false);
    setWeatherData(null);
    setFetchedLocation("");
    setLocation(null);
    setFetched(false);
    setAddress("");
    setError(null);
    setLoading(false);
    setManualInput(false);
    localStorage.setItem("weatherDataFetched", "false");
    localStorage.setItem("locationFetched", "false");
  };
  const getParsedForecastData = () => {
    if (weatherData) return weatherData;
    try {
      const stored = localStorage.getItem("weatherData");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Failed to parse stored weather data:", err);
      return [];
    }
  };

  const handleSuccessFetching = (response) => {
    setWeatherData(response?.data?.forecast);
    setFetchedLocation(response?.data?.location);
    setWeatherDataFetched(true);
    localStorage.setItem("latitude", response?.data?.latitude);
    localStorage.setItem("longitude", response?.data?.longitude);
    localStorage.setItem(
      "weatherData",
      response?.data?.forecast?.map((item) => JSON.stringify(item))
    );
    localStorage.setItem("weatherDataFetched", "true");
    localStorage.setItem("fetchedLocation", response?.data?.location);
    localStorage.setItem("locationFetched", "true");
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    if (fetched && location?.lat && location?.lon) {
      try {
        const response = await getWeatherForecast(location.lat, location.lon);
        handleSuccessFetching(response);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    if (address) {
      try {
        const response = await getWeatherForecast(null, null, address);
        handleSuccessFetching(response);
      } catch (error) {
        console.error("Error fetching weather data with address:", error);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    if (localStorage.getItem("locationFetched") === "true") {
      setFetched(true);
      setLocation({
        lat: localStorage.getItem("latitude"),
        lon: localStorage.getItem("longitude"),
      });
      fetchWeatherData();
    }
  }, []);
  useEffect(() => {
    fetchWeatherData();
  }, [location, address]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-emerald-100 to-green-100 p-4 sm:p-6 lg:p-16">
        <Loader className="animate-spin text-green-600" size={48} />
      </div>
    );
  }
  return (
    <>
      {weatherDataFetched ? (
        <>
          <WeatherForecastTable
            forecastData={
              getParsedForecastData() ||
              weatherData?.map((item) => {
                JSON.parse(JSON.stringify(item));
              }) ||
              []
            }
            fetchedLocation={fetchedLocation}
            isLoading={loading}
            handleResetLocation={handleResetLocation}
          />
        </>
      ) : (
        <>
          <div className="min-h-screen grid place-items-center bg-gradient-to-br from-green-50 via-green-100 to-emerald-200 px-8 py-16">
            <div className="w-full max-w-3xl">
              <div className="relative group">
                <div className="relative bg-white bg-opacity-90 shadow-2xl rounded-3xl border border-green-100 p-10 lg:p-16 text-center group-hover:shadow-3xl transition-all duration-500">
                  {!fetched ? (
                    <>
                      <div className="relative flex justify-center mb-8">
                        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-5 lg:p-6 shadow-lg">
                          <MapPin size={48} className="text-white" />
                        </div>
                      </div>

                      <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-6">
                        Get Location
                      </h1>

                      <div className="space-y-4 mb-10">
                        <p className="text-lg lg:text-xl text-gray-700 font-medium">
                          To get the weather, please allow location access.
                        </p>
                        <p className="text-sm lg:text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
                          This helps us provide accurate weather information
                          based on your current location.
                        </p>
                      </div>

                      <button
                        className="relative group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 lg:px-12 py-4 lg:py-5 rounded-2xl flex items-center gap-3 justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mx-auto overflow-hidden"
                        onClick={getLocation}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <LocateFixed
                          size={24}
                          className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
                        />
                        <span className="relative z-10 text-lg lg:text-xl">
                          Allow Location Access
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      {loading ? (
                        <div className="flex flex-col items-center justify-center text-green-700 gap-6 lg:gap-8">
                          <div className="relative">
                            <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-full animate-ping" />
                            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-5 shadow-lg">
                              <Loader
                                className="animate-spin text-white"
                                size={36}
                              />
                            </div>
                          </div>

                          <div className="text-center">
                            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                              Fetching Location
                            </h2>
                            <p className="text-gray-600 font-medium text-lg">
                              Please wait while we get your coordinates...
                            </p>
                          </div>
                        </div>
                      ) : error ? (
                        <div className="flex flex-col items-center gap-6">
                          <div className="relative">
                            <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-full animate-pulse" />
                            <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-5 shadow-lg">
                              <AlertTriangle size={36} className="text-white" />
                            </div>
                          </div>

                          <div className="text-center">
                            <h2 className="text-2xl lg:text-3xl font-bold text-red-600 mb-3">
                              Location Error
                            </h2>
                            <p className="text-gray-700 font-medium leading-relaxed max-w-lg mx-auto text-base">
                              {error}
                            </p>

                            <div className="mt-6 flex flex-wrap justify-center gap-4">
                              <button
                                onClick={() => {
                                  setError(null);
                                  setFetched(false);
                                }}
                                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                              >
                                Try Again
                              </button>
                              <button
                                onClick={() => {
                                  setManualInput(true);
                                  setFetched(false);
                                }}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                              >
                                Enter Manually
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (

                        <> </>

                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {manualInput && (
              <AddressInput
                onSubmit={setAddress}
                onClose={() => setManualInput(false)}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default GetLocation;
