// /* eslint-disable no-unused-vars */
// import {
//   Camera,
//   Users,
//   BookOpen,
//   Sprout,
//   MapPin,
//   Thermometer,
//   Cloud,
//   Droplets,
//   User,
//   ChevronDown,
//   CloudRain,
//   Bot,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import React, { useState, useRef, useEffect } from "react";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// export default function Dashboard() {
//   const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "localhost:8000";
//   const authData = JSON.parse(
//     localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}"
//   );
//   const token = authData?.access_token || "";
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const first = user?.user_metadata?.first_name;
//   const last = user?.user_metadata?.last_name;
//   const full = user?.user_metadata?.full_name;
//   const username =
//     (first && last ? `${first} ${last}` : full) || "Unknown User";
//   const [open, setOpen] = useState(false);
//   const [weatherData, setWeatherData] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const menuRef = useRef();
//   const [latitude, setLatitude] = useState();
//   const [longitude, setLongitude] = useState();

//   // useEffect(() => {
//   //   if(navigator.geolocation) {
//   //     navigator.geolocation.getCurrentPosition(
//   //       function (position) {
//   //         setLatitude(position.coords.latitude);
//   //         setLongitude(position.coords.longitude);
//   //         console.log(latitude, longitude);
//   //         console.log(position.coords.latitude, position.coords.longitude);
//   //       },
//   //       function(error) {
//   //         switch (error.code) {
//   //           case error.PERMISSION_DENIED:
//   //             console.error("User denied the request for Geolocation.");
//   //             break;
//   //           case error.POSITION_UNAVAILABLE:
//   //             console.error("Location information is unavailable.");
//   //             break;
//   //           case error.TIMEOUT:
//   //             console.error("The request to get user location timed out.");
//   //             break;
//   //           case error.UNKNOWN_ERROR:
//   //             console.error("An unknown error occurred.");
//   //             break;
//   //         }
//   //       },
//   //       {enableHighAccuracy: true, timeout:10000}
//   //     );
//   //   } else {
//   //     console.error("Geolocation is not supported by the browser.");
//   //   }
//   //   const fetchWeather = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const res = await fetch(`http://127.0.0.1:8004/current?latitude=${latitude}&longitude=${longitude}`);
//   //       if (!res.ok) {
//   //         throw new Error(`Error: ${res.status}`);
//   //       }
//   //       const data = await res.json();
//   //       console.log(data.data);
//   //       setWeatherData(data.data);
//   //     } catch (err) {
//   //       setError(err.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchWeather();

//   // function handleClickOutside(event) {
//   //   if (menuRef.current && !menuRef.current.contains(event.target)) {
//   //     setOpen(false);
//   //   }
//   // }
//   // document.addEventListener("mousedown", handleClickOutside);
//   // return () => document.removeEventListener("mousedown", handleClickOutside);
//   // }, [latitude, longitude]);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       console.error("Geolocation is not supported by the browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);
//       },
//       (error) => {
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             console.error("User denied the request for Geolocation.");
//             break;
//           case error.POSITION_UNAVAILABLE:
//             console.error("Location information is unavailable.");
//             break;
//           case error.TIMEOUT:
//             console.error("The request to get user location timed out.");
//             break;
//           default:
//             console.error("An unknown error occurred.");
//         }
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   }, []);

//   useEffect(() => {
//     if (!latitude || !longitude) return;
//     const fetchWeather = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           `${BACKEND_URL}/weather/current?latitude=${latitude}&longitude=${longitude}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (!res.ok) throw new Error(`Error: ${res.status}`);
//         const data = await res.json();
//         setWeatherData(data.data);
//         setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();

//     function handleClickOutside(event) {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [VITE_BACKEND_URL, latitude, longitude, token]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//         <p className="text-gray-500">Loading weather...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-green-600 mb-2">
//               Welcome to LeafScan
//             </h1>
//           </div>
//           {/* <div className="text-right relative" ref={menuRef}>
//             <button
//               className="bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm font-medium flex items-center gap-2"
//               onClick={() => setOpen((prev) => !prev)}
//             >
//               <User className="w-6 h-6 inline-block mr-2" />
//               {username}
//               <ChevronDown className="w-4 h-4" />
//             </button>
//             {open && (
//               <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                 <button
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
//                   onClick={() => {
//                     setOpen(false);
//                     navigate("/account");
//                   }}
//                 >
//                   My Account
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div> */}
//         </div>

//         {/* Current Location & Weather */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="flex items-center gap-2 mb-4">
//             <MapPin className="w-5 h-5 text-green-600" />
//             <h2 className="text-xl font-semibold text-gray-800">
//               Current Location & Weather
//             </h2>
//           </div>

//           {weatherData ? (
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {/* Location */}
//               <div className="flex items-center gap-3">
//                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                 <div>
//                   <p className="text-gray-500 text-sm">Location</p>
//                   <p className="font-semibold text-gray-800">
//                     {location || "Unknown"}
//                   </p>
//                 </div>
//               </div>

//               {/* Temperature */}
//               <div className="flex items-center gap-3">
//                 <Thermometer className="w-5 h-5 text-orange-500" />
//                 <div>
//                   <p className="text-gray-500 text-sm">Temperature</p>
//                   <p className="font-semibold text-gray-800">
//                     {weatherData.current_temperature.toFixed(1)}°C
//                   </p>
//                 </div>
//               </div>

//               {/* Condition (basic check) */}
//               <div className="flex items-center gap-3">
//                 <Cloud className="w-5 h-5 text-blue-500" />
//                 <div>
//                   <p className="text-gray-500 text-sm">Condition</p>
//                   <p className="font-semibold text-gray-800">
//                     {weatherData.current_temperature > 30
//                       ? "Sunny"
//                       : weatherData.current_temperature > 25
//                       ? "Partly Cloudy"
//                       : "Cloudy"}
//                   </p>
//                 </div>
//               </div>

//               {/* Humidity */}
//               <div className="flex items-center gap-3">
//                 <Droplets className="w-5 h-5 text-cyan-500" />
//                 <div>
//                   <p className="text-gray-500 text-sm">Humidity</p>
//                   <p className="font-semibold text-gray-800">
//                     {weatherData.current_relative_humidity}%
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-500">Weather data not available</p>
//           )}
//         </div>

//         {/* Statistics */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
//           <div className="bg-white rounded-lg shadow-sm px-4 py-5 border border-green-100 text-center">
//             <div className="text-3xl font-bold text-green-600 mb-2">156</div>
//             <div className="text-gray-600">Plants Diagnosed</div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm text-center px-4 py-5  border border-green-100">
//             <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
//             <div className="text-gray-600">Accuracy Rate</div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm px-4 py-5 r border border-green-100 text-center">
//             <div className="text-3xl font-bold text-green-600 mb-2">2.3k</div>
//             <div className="text-gray-600">Community Members</div>
//           </div>
//         </div>

//         {/* Explore Modules */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Explore Modules
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* Plant Diagnosis */}
//             <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
//               <Link to="/diagnosis">
//                 <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//                   <Camera className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Plant Diagnosis
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-6">
//                   Upload photos for AI-powered disease detection
//                 </p>
//                 <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
//                   Get Started
//                 </button>
//               </Link>
//             </div>

//             {/* LeafScan Community */}
//             <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
//               <Link to="/forum">
//                 <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//                   <Users className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   LeafScan Community
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-6">
//                   Connect with experts and fellow gardeners
//                 </p>
//                 <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
//                   Get Started
//                 </button>
//               </Link>
//             </div>

//             {/* Disease Information */}
//             <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
//               <Link to="/diseases">
//                 <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//                   <BookOpen className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Disease Information
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-6">
//                   Comprehensive plant disease database
//                 </p>
//                 <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
//                   Get Started
//                 </button>
//               </Link>
//             </div>

//             {/* Cultivation Tips */}
//             <div className="bg-white px-6 py-5 rounded-lg shadow-md border border-green-100 text-center">
//               <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//                 <Sprout className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 Cultivation Tips
//               </h3>
//               <p className="text-gray-600 text-sm mb-6">
//                 Expert advice for healthy plant growth
//               </p>
//               <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
//                 Get Started
//               </button>
//             </div>

//             {/* User History Module */}
//             <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
//               <Link to="/user-history">
//                 <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//                   <BookOpen className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   My Diagnosis History
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-6">
//                   View my past plant disease predictions
//                 </p>
//                 <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
//                   View History
//                 </button>
//               </Link>
//             </div>

//             {/* Weather Data */}
//             <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
//               <Link to="/weather">
//                 <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//                   <CloudRain className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Weather Forecast
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-6">
//                   View 7 day weather forecast in my area
//                 </p>
//                 <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
//                   View Weather
//                 </button>
//               </Link>
//             </div>
//             {/*Chatbot*/}
//             <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
//               <Link to="/chat">
//                 <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//                   <Bot className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   LeafScan Chatbot
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-6">
//                   AI Powered Chatbot for Plant and Agriculuture Help
//                 </p>
//                 <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
//                   Get Started
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  Users,
  BookOpen,
  Sprout,
  MapPin,
  Thermometer,
  Cloud,
  Droplets,
  User,
  ChevronDown,
  CloudRain,
  Bot,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import WeatherCard from "../components/weather/WeatherCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Dashboard() {
  const authData = JSON.parse(
    localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}"
  );
  const token = authData?.access_token || "";
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const first = user?.user_metadata?.first_name;
  const last = user?.user_metadata?.last_name;
  const full = user?.user_metadata?.full_name;
  const username = (first && last ? `${first} ${last}` : full) || "Unknown";

  const [open, setOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const menuRef = useRef();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => console.error("Geolocation error", err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BACKEND_URL}/weather/current?latitude=${latitude}&longitude=${longitude}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setWeatherData(data.data);
        setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [BACKEND_URL, latitude, longitude, token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // demo chart data (replace with real metrics)
  const chartData = [
    { day: "Mon", value: 12 },
    { day: "Tue", value: 20 },
    { day: "Wed", value: 15 },
    { day: "Thu", value: 22 },
    { day: "Fri", value: 17 },
    { day: "Sat", value: 24},
    { day: "Sun", value: 19 },
  ];

  // small helper for animated stat cards
  const StatCard = ({ title, value, unit, icon, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, type: "spring", stiffness: 120 }}
      className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {value} <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-white/20">{icon}</div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* top bar */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold text-green-700"
            >
              Welcome back <span className="text-gray-800">{username}</span>
            </motion.h1>
          </div>

          <div className="flex items-center gap-4">
          </div>
        </div>

        {/* top grid: stats + weather + chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Plants Diagnosed"
                value="156"
                icon={<Camera className="w-6 h-6 text-emerald-600" />}
                delay={0.05}
              />
              <StatCard
                title="Accuracy Rate"
                value="89%"
                icon={<Sprout className="w-6 h-6 text-amber-500" />}
                delay={0.12}
              />
              <StatCard
                title="Community"
                value="2.3k"
                icon={<Users className="w-6 h-6 text-sky-500" />}
                delay={0.18}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-6 bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600">Weekly Diagnoses</div>
                  <div className="text-lg font-semibold text-gray-900">Insights</div>
                </div>
                <div className="text-sm text-gray-500">Updated just now</div>
              </div>

              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopOpacity={0.4} stopColor="#10b981" />
                        <stop offset="100%" stopOpacity={0.05} stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#gradA)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Weather / mini panel on right */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 }}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-sm text-gray-600">Current Location</div>
                <div className="font-semibold text-gray-900">{location || "Unknown"}</div>
              </div>
            </div>

            {/* {loading ? (
              <div className="text-gray-500">Loading weather...</div>
            ) : weatherData ? (
              <div className="flex flex-col items-center gap-3">
                <div className="text-6xl font-bold text-gray-900">{weatherData.current_temperature.toFixed(1)}°C</div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Cloud className="w-5 h-5" />
                  <div>{weatherData.current_relative_humidity}% humidity</div>
                </div>

                <div className="mt-3 w-full grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/30 text-center">
                    <div className="text-xs text-gray-500">Wind</div>
                    <div className="font-medium text-gray-900">{weatherData.wind_speed || "—"} m/s</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/30 text-center">
                    <div className="text-xs text-gray-500">Humidity</div>
                    <div className="font-medium text-gray-900">{weatherData.current_relative_humidity}%</div>
                  </div>
                </div>

                <div className="mt-4 w-full text-center text-sm text-gray-600">{weatherData.description || "Clear skies"}</div>
              </div>
            ) : (
              <div className="text-gray-500">Weather data not available</div>
            )}
          </motion.div> */}
          <WeatherCard loading={loading} weatherData={weatherData} />
          </motion.div>
        </div>

        {/* Modules grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Explore Modules</h2>
            <div className="text-sm text-gray-500">Quick access to important areas</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { title: "Plant Diagnosis", to: "/diagnosis", icon: <Camera className="w-7 h-7 text-white" />, color: "bg-emerald-500" },
              { title: "Community", to: "/forum", icon: <Users className="w-7 h-7 text-white" />, color: "bg-sky-500" },
              { title: "Disease Info", to: "/diseases", icon: <BookOpen className="w-7 h-7 text-white" />, color: "bg-orange-500" },
              { title: "Cultivation Tips", to: "/tips", icon: <Sprout className="w-7 h-7 text-white" />, color: "bg-purple-500" },
              { title: "History", to: "/user-history", icon: <BookOpen className="w-7 h-7 text-white" />, color: "bg-emerald-600" },
              { title: "Weather", to: "/weather", icon: <CloudRain className="w-7 h-7 text-white" />, color: "bg-emerald-400" },
              { title: "Chatbot", to: "/chat", icon: <Bot className="w-7 h-7 text-white" />, color: "bg-amber-500" },
            ].map((m, i) => (
              <motion.div
                key={m.title}
                whileHover={{ scale: 1.03, y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow hover:shadow-xl"
              >
                <Link to={m.to} className="flex flex-col items-start gap-3">
                  <div className={`p-3 rounded-xl ${m.color} shadow-md`}>{m.icon}</div>
                  <div className="font-semibold text-gray-900">{m.title}</div>
                  <div className="text-xs text-gray-500">Quick action to {m.title.toLowerCase()}</div>

                  <div className="absolute right-4 bottom-4">
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      className="px-3 py-2 rounded-md bg-white/20 backdrop-blur text-sm"
                    >
                      Open
                    </motion.button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating chatbot CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 260 }}
          className="fixed right-6 bottom-6 z-50"
        >
          <Link to="/chat" className="group">
            <div className="w-16 h-16 rounded-full bg-emerald-600 shadow-xl flex items-center justify-center transform-gpu hover:scale-105 transition">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div className="mt-2 text-xs text-gray-600 text-center">Ask LeafScan</div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}


