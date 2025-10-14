/* eslint-disable no-unused-vars */
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
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";

export default function Dashboard() {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "localhost:8000";
  const authData = JSON.parse(
    localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}"
  );
  const token = authData?.access_token || "";
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const first = user?.user_metadata?.first_name;
  const last = user?.user_metadata?.last_name;
  const full = user?.user_metadata?.full_name;
  const username =
    (first && last ? `${first} ${last}` : full) || "Unknown User";
  const [open, setOpen] = useState(false);
  const [weatherData, setWeatherData] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const menuRef = useRef();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // useEffect(() => {
  //   if(navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       function (position) {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //         console.log(latitude, longitude);
  //         console.log(position.coords.latitude, position.coords.longitude);
  //       },
  //       function(error) {
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
  //           case error.UNKNOWN_ERROR:
  //             console.error("An unknown error occurred.");
  //             break;
  //         }
  //       },
  //       {enableHighAccuracy: true, timeout:10000}
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by the browser.");
  //   }
  //   const fetchWeather = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(`http://127.0.0.1:8004/current?latitude=${latitude}&longitude=${longitude}`);
  //       if (!res.ok) {
  //         throw new Error(`Error: ${res.status}`);
  //       }
  //       const data = await res.json();
  //       console.log(data.data);
  //       setWeatherData(data.data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchWeather();

  // function handleClickOutside(event) {
  //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //     setOpen(false);
  //   }
  // }
  // document.addEventListener("mousedown", handleClickOutside);
  // return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [latitude, longitude]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by the browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          default:
            console.error("An unknown error occurred.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${VITE_BACKEND_URL}/weather/current?latitude=${latitude}&longitude=${longitude}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [VITE_BACKEND_URL, latitude, longitude, token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <p className="text-gray-500">Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-600 mb-2">
              Welcome to LeafScan
            </h1>
          </div>
          {/* <div className="text-right relative" ref={menuRef}>
            <button
              className="bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm font-medium flex items-center gap-2"
              onClick={() => setOpen((prev) => !prev)}
            >
              <User className="w-6 h-6 inline-block mr-2" />
              {username}
              <ChevronDown className="w-4 h-4" />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  onClick={() => {
                    setOpen(false);
                    navigate("/account");
                  }}
                >
                  My Account
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div> */}
        </div>

        {/* Current Location & Weather */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Current Location & Weather
            </h2>
          </div>

          {weatherData ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="font-semibold text-gray-800">
                    {location || "Unknown"}
                  </p>
                </div>
              </div>

              {/* Temperature */}
              <div className="flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-gray-500 text-sm">Temperature</p>
                  <p className="font-semibold text-gray-800">
                    {weatherData.current_temperature.toFixed(1)}°C
                  </p>
                </div>
              </div>

              {/* Condition (basic check) */}
              <div className="flex items-center gap-3">
                <Cloud className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-gray-500 text-sm">Condition</p>
                  <p className="font-semibold text-gray-800">
                    {weatherData.current_temperature > 30
                      ? "Sunny"
                      : weatherData.current_temperature > 25
                      ? "Partly Cloudy"
                      : "Cloudy"}
                  </p>
                </div>
              </div>

              {/* Humidity */}
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-cyan-500" />
                <div>
                  <p className="text-gray-500 text-sm">Humidity</p>
                  <p className="font-semibold text-gray-800">
                    {weatherData.current_relative_humidity}%
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Weather data not available</p>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
          <div className="bg-white rounded-lg shadow-sm px-4 py-5 border border-green-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">156</div>
            <div className="text-gray-600">Plants Diagnosed</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm text-center px-4 py-5  border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm px-4 py-5 r border border-green-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2.3k</div>
            <div className="text-gray-600">Community Members</div>
          </div>
        </div>

        {/* Explore Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Explore Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Plant Diagnosis */}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <Link to="/diagnosis">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Plant Diagnosis
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Upload photos for AI-powered disease detection
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Get Started
                </button>
              </Link>
            </div>

            {/* LeafScan Community */}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <Link to="/forum">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  LeafScan Community
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Connect with experts and fellow gardeners
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Disease Information */}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <Link to="/diseases">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Disease Information
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Comprehensive plant disease database
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Cultivation Tips */}
            <div className="bg-white px-6 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Cultivation Tips
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Expert advice for healthy plant growth
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Get Started
              </button>
            </div>

            {/* User History Module */}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <Link to="/user-history">
                <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  My Diagnosis History
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  View my past plant disease predictions
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  View History
                </button>
              </Link>
            </div>

            {/* Weather Data */}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <Link to="/weather">
                <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CloudRain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Weather Forecast
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  View 7 day weather forecast in my area
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  View Weather
                </button>
              </Link>
            </div>
            {/*Chatbot*/}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <Link to="/chat">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  LeafScan Chatbot
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  AI Powered Chatbot for Plant and Agriculuture Help
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
