import axios from "axios";
import { toast } from "react-hot-toast";

const FORECAST_URL = import.meta.env.VITE_WEATHER_SERVICE_URL;

export const getWeatherForecast = async (latitude, longitude, address) => {
  try {
    const response = await axios.get(`${FORECAST_URL}/forecast`, {
      params: { latitude, longitude, address },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    toast.error("Failed to fetch weather forecast");
    throw error;
  }
};
