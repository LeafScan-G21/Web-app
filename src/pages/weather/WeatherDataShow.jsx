/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  MapPin,
  LocateFixed,
  CheckCircle,
  Loader,
  AlertTriangle,
  Cloud,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddressInput from "../../components/weather/AddressInput";
import { getWeatherForecast } from "../../services/weather/forecast";
import WeatherForecastTable from "../../components/weather/WeatherForecastTable";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, address]);
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4 sm:p-6 lg:p-16"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-full animate-ping" />
          <Loader className="relative text-green-600" size={48} />
        </motion.div>
      </motion.div>
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen grid place-items-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-8 py-16"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-3xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-300 rounded-full opacity-20 blur-3xl"
              />
            </div>

            <motion.div
              variants={itemVariants}
              className="w-full max-w-3xl relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
                <motion.div
                  variants={itemVariants}
                  className="relative bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl rounded-3xl border-2 border-green-100 p-10 lg:p-16 text-center"
                >
                  {!fetched ? (
                    <>
                      <motion.div
                        variants={iconVariants}
                        className="relative flex justify-center mb-8"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-5 lg:p-6 shadow-xl ring-4 ring-green-100"
                        >
                          <MapPin size={48} className="text-white" />
                        </motion.div>
                      </motion.div>

                      <motion.h1
                        variants={itemVariants}
                        className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-6"
                      >
                        Get Location
                      </motion.h1>

                      <motion.div
                        variants={itemVariants}
                        className="space-y-4 mb-10"
                      >
                        <p className="text-lg lg:text-xl text-gray-700 font-medium">
                          To get the weather, please allow location access.
                        </p>
                        <p className="text-sm lg:text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
                          This helps us provide accurate weather information
                          based on your current location.
                        </p>
                      </motion.div>

                      <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 lg:px-12 py-4 lg:py-5 rounded-2xl flex items-center gap-3 justify-center transition-all duration-300 shadow-xl hover:shadow-2xl mx-auto overflow-hidden"
                        onClick={getLocation}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <motion.div
                          whileHover={{ rotate: 12 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <LocateFixed size={24} className="relative z-10" />
                        </motion.div>
                        <span className="relative z-10 text-lg lg:text-xl">
                          Allow Location Access
                        </span>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center text-green-700 gap-6 lg:gap-8"
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                rotate: 360,
                              }}
                              transition={{
                                scale: {
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                },
                                rotate: {
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "linear",
                                },
                              }}
                              className="relative"
                            >
                              <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-full animate-ping" />
                              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-5 shadow-xl ring-4 ring-green-100">
                                <Loader className="text-white" size={36} />
                              </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-center"
                            >
                              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                                Fetching Location
                              </h2>
                              <p className="text-gray-600 font-medium text-lg">
                                Please wait while we get your coordinates...
                              </p>
                            </motion.div>
                          </motion.div>
                        ) : error ? (
                          <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center gap-6"
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="relative"
                            >
                              <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-full animate-pulse" />
                              <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-5 shadow-xl ring-4 ring-red-100">
                                <AlertTriangle
                                  size={36}
                                  className="text-white"
                                />
                              </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-center"
                            >
                              <h2 className="text-2xl lg:text-3xl font-bold text-red-600 mb-3">
                                Location Error
                              </h2>
                              <p className="text-gray-700 font-medium leading-relaxed max-w-lg mx-auto text-base">
                                {error}
                              </p>

                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-6 flex flex-wrap justify-center gap-4"
                              >
                                <motion.button
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => {
                                    setError(null);
                                    setFetched(false);
                                  }}
                                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                  Try Again
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => {
                                    setManualInput(true);
                                    setFetched(false);
                                  }}
                                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                  Enter Manually
                                </motion.button>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <> </>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {manualInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <AddressInput
                    onSubmit={setAddress}
                    onClose={() => setManualInput(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </>
  );
};

export default GetLocation;
