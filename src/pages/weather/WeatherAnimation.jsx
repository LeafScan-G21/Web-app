import React from "react";
import Lottie from "lottie-react";

import sunny from "../../assets/weather/sunny.json";
import cloudy from "../../assets/weather/cloudy.json";
import rainy from "../../assets/weather/rainy.json";

const WeatherAnimation = ({ condition }) => {
  const getAnimation = () => {
    const text = condition?.toLowerCase() || "";
    if (text.includes("rain")) return rainy;
    if (text.includes("thunder")) return thunder;
    if (text.includes("cloud")) return cloudy;
    if (text.includes("fog") || text.includes("mist")) return fog;
    return sunny;
  };

  return (
    <div className="flex justify-center items-center w-24 h-24 mx-auto">
      <Lottie animationData={getAnimation()} loop={true} />
    </div>
  );
};

export default WeatherAnimation;
