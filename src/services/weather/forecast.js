import axios from "axios";
import { toast } from "react-hot-toast";

const FORECAST_URL = `${import.meta.env.VITE_BACKEND_URL}/weather`;

export const getWeatherForecast = async (latitude, longitude, address) => {
  try {
    const authData = JSON.parse(
          localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}"
        );
    const token = authData?.access_token || "";
    const Authorization = token ? `Bearer ${token}` : "";
    const response = await axios.get(`${FORECAST_URL}/forecast`, {
      params: { latitude, longitude, address },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    toast.error("Failed to fetch weather forecast");
    throw error;
  }
};

export const geturrentWeather = async (latitude, longitude) => {
  try {
    const authData = JSON.parse(
          localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}"
        );
    const token = authData?.access_token || "";
    const Authorization = token ? `Bearer ${token}` : "";
    const response = await axios.get(`${FORECAST_URL}/current`, {
      params: { latitude, longitude },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    toast.error("Failed to fetch current weather");
    throw error;
  }
};
