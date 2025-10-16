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
  TrendingUp,
  Leaf,
  Sun,
  Wind,
  Target,
  Award,
  History,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import heroImage from "../assets/dashboard.png";
import Image_Tomato from "../assets/Image_1.webp";
import Image_Vegitable from "../assets/Image_2.jpg";
import Image_Bell_pepper from "../assets/Bell_pepper.webp";
import Image_StrewBerry from "../assets/StrewBerry.jpg";
 
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Dashboard() {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
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
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselImages = [
    Image_Tomato,
    Image_Vegitable,
    Image_Bell_pepper,
    Image_StrewBerry
  ];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

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
          `${BACKEND_URL}/weather/current?latitude=${latitude}&longitude=${longitude}`,
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

 
  const modules = [
    {
      icon: Camera,
      title: "Plant Diagnosis",
      description: "AI-powered disease detection",
      color: "from-green-600 to-green-400",
      iconBg: "bg-green-600",
      path: "/diagnosis",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with experts",
      color: "from-blue-400 to-cyan-500",
      iconBg: "bg-blue-500",
      path: "/forum",
    },
    {
      icon: BookOpen,
      title: "Disease Info",
      description: "Comprehensive database",
      color: "from-orange-500 to-orange-400",
      iconBg: "bg-orange-500",
      path: "/diseases",
    },
    {
      icon: Sprout,
      title: "Cultivation Tips",
      description: "Expert growing advice",
      color: "bg-gradient-to-br from-pink-500 to-purple-500",
      iconBg: "bg-pink-600",
      path: "/tips",
    },
    {
      icon: History,
      title: "My History",
      description: "Past diagnoses",
      color: "from-teal-400 to-cyan-500",
      iconBg: "bg-teal-500",
      path: "/user-history",
    },
    {
      icon: CloudRain,
      title: "Weather",
      description: "7-day forecast",
      color: "from-sky-400 to-blue-500",
      iconBg: "bg-sky-500",
      path: "/weather",
    },
    {
      icon: Bot,
      title: "AI Chatbot",
      description: "Plant care assistant",
      color: "from-violet-600 to-purple-400",
      iconBg: "bg-violet-500",
      path: "/chat",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-100">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMTViNzFhIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-12 animate-fade-in">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700/95 to-green-600/70" />
          </div>
          <div className="relative px-8 py-12 sm:px-12 sm:py-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm mb-4 text-sm font-medium hover:bg-white/30 transition-colors">
              Welcome Back
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
              Hello, {username}!
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Your plants are thriving! Let&apos;s continue monitoring their health together.
            </p>
          </div>
        </div>

        {/* Weather and Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-green-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Current Environment
                </h2>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600"></div>
                </div>
              ) : weatherData ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="group">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="w-5 h-5 text-green-600" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Location
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        {location || "Detecting..."}
                      </p>
                    </div>
                  </div>

                  <div className="group">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="w-5 h-5 text-orange-600" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Temp
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        {weatherData.current_temperature.toFixed(1)}°C
                      </p>
                    </div>
                  </div>

                  <div className="group">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <Cloud className="w-5 h-5 text-sky-600" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Sky
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        {weatherData.current_temperature > 30
                          ? "Sunny"
                          : weatherData.current_temperature > 25
                          ? "Partly Cloudy"
                          : "Cloudy"}
                      </p>
                    </div>
                  </div>

                  <div className="group">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5 text-cyan-600" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Humidity
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        {weatherData.current_relative_humidity}%
                      </p>
                    </div>
                  </div>

                  {/* Image Carousel - full width on md+ screens */}
                  <div className="col-span-2 md:col-span-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden transition-all duration-300 shadow hover:shadow-lg h-full">
                      <div className="relative w-full h-64">
                        {carouselImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Carousel ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                              index === carouselIndex ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        ))}
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                          {carouselImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCarouselIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === carouselIndex
                                  ? "bg-white w-6"
                                  : "bg-white/50 hover:bg-white/70"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Weather data unavailable
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-l from-green-500 to-green-700 rounded-3xl shadow-xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-4xl font-bold mb-1">156</div>
              <div className="text-white font-medium">
                Plants Diagnosed
              </div>
            </div>

            <div className="bg-gradient-to-l from-blue-500 to-blue-700 rounded-3xl shadow-xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-4xl font-bold mb-1">89%</div>
              <div className="text-white font-medium">Accuracy Rate</div>
            </div>

            <div className="bg-gradient-to-l from-emerald-500 to-teal-700 rounded-3xl shadow-xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-4xl font-bold mb-1">2.3k</div>
              <div className="text-white font-medium">Community Members</div>
            </div>
          </div>
        </div>

        {/* Explore Modules */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Wind className="w-6 h-6 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Explore Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Link key={index} to={module.path}>
                  <div
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`h-2 bg-gradient-to-r ${module.color}`}
                    ></div>
                    <div className="p-6">
                      <div
                        className={`w-14 h-14 ${module.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {module.description}
                      </p>
                      <button className="w-full bg-gradient-to-r from-green-700 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl group-hover:scale-105">
                        Launch
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-green-800 via-green-700 to-green-600 rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">
                Ready to diagnose your plants?
              </h3>
              <p className="text-green-100 text-lg">
                Upload a photo and get instant AI-powered insights about plant
                health
              </p>
            </div>
            <Link to="/diagnosis">
              <button className="bg-white text-green-700 hover:bg-green-50 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Start Diagnosis
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}