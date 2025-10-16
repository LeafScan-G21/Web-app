import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cloud, Wind, AlertTriangle, Lightbulb, Bug, Leaf } from "lucide-react";
import CareAdviceItem from "../components/ui/CareAdviceItem";
import DiagnosisLoader from "../components/loaders/DiagnosisLoader";
import { motion } from "framer-motion";

// New Component for Care Advice Items
// const CareAdviceItem = ({ item, index }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const parseMarkdown = (text) => {
//     if (!text) return text;

//     // Convert LaTeX temperature notation to readable format
//     let cleanedText = text.replace(/\$(\d+)\^\{?\\circ\}?\s*\\text\{([FC])\}\$/g, '$1°$2');

//     // Process the cleaned text for bold markdown
//     const parts = cleanedText.split('**');
//     return parts.map((part, index) => {
//       if (index % 2 === 1) {
//         return <strong key={index}>{part}</strong>;
//       }
//       return part;
//     });
//   };

//   return (
//     <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg overflow-hidden shadow-sm">
//       <div
//         className="flex items-start p-4 space-x-3 cursor-pointer select-none"
//         onClick={() => item.relevance_reason && setIsOpen(!isOpen)}
//       >
//         <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold">
//           {index + 1}
//         </div>
//         <div className="flex-grow text-gray-800 font-medium">
//           {parseMarkdown(item.advice)}
//         </div>
//         {item.relevance_reason && (
//           <div className="flex-shrink-0 ml-2 self-center">
//             <ChevronDown
//               className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
//             />
//           </div>
//         )}
//       </div>

//       {/* Expandable "Why" section with smooth transition */}
//       <div
//         className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
//       >
//         {item.relevance_reason && (
//           <div className="pl-16 pr-4 pb-4">
//             <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
//               <span className="font-semibold text-green-700">Why it's important:</span> {parseMarkdown(item.relevance_reason)}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const Prediction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let predictionData = location.state?.predictionData;

    if (!predictionData) {
      const storedData = sessionStorage.getItem("predictionResult");
      if (storedData) {
        try {
          predictionData = JSON.parse(storedData);
        } catch (error) {
          console.error("Error parsing stored prediction data:", error);
        }
      }
    }

    if (predictionData) {
      setData(predictionData);
      setLoading(false);
    } else {
      navigate("/diagnosis", { replace: true });
    }

    return () => {
      sessionStorage.removeItem("predictionResult");
    };
  }, [location.state, navigate]);

  const parseMarkdown = (text) => {
    if (!text) return text;

    const parts = text.split("**");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  const formatText = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {parseMarkdown(line)}
      </p>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getConfidenceColor = (confidence) => {
    const percentage = confidence * 100;
    if (percentage >= 90) return "text-white bg-green-500";
    if (percentage >= 70) return "text-white bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return <DiagnosisLoader />;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Prediction Data Found
          </h2>
          <p className="text-gray-600 mb-4">
            Please upload an image first to get a diagnosis.
          </p>
          <button
            onClick={() => navigate("/diagnosis")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Diagnosis Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <img
                src={data.cloudinary_url || data.image_url}
                alt="Plant"
                className="h-80 lg:h-full w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 p-6 flex flex-col justify-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-red-700 text-center">
                {data.disease_data?.disease_name || "Unknown Disease"}
              </h1>
              <p className="text-lg text-gray-700 text-center">
                Plant:{" "}
                <span className="font-semibold">
                  {data.disease_data?.plant_name || "Unknown Plant"}
                </span>
              </p>
              <div
                className={`inline-block px-5 py-2 mx-auto rounded-full text-center font-semibold text-white ${getConfidenceColor(
                  data.confidence
                )}`}
              >
                {(data.confidence * 100).toFixed(1)}% Confidence
              </div>
            </div>
          </div>

          {data.weather?.data?.forecast && (
            <div className="rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-semibold flex items-center mb-4 text-green-700">
              <Cloud className="mr-2" /> 7-Day Forecast
            </h2>

            <div className="flex flex-col space-y-4 overflow-y-auto max-h-96">
              {data.weather.data.forecast.map((day, i) => (
                <motion.div
                  key={i}
                  className="relative bg-white/70 p-4 rounded-2xl shadow-sm backdrop-blur-md"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >

                  <div className="text-center">
                    <p className="font-semibold text-gray-800">{formatDate(day.date)}</p>
                    <p className="text-sm text-gray-600">
                      {day.min_temp}° - {day.max_temp}°C
                    </p>
                    <p className="text-sm text-green-600">
                      {day.humidity}% Humidity
                    </p>
                    <p className="text-sm text-gray-500">{day.wind_speed} km/h</p>
                  </div>

                  <div className="absolute top-3 right-3 text-xs text-gray-400 italic">
                    {day.description || "Clear skies"}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          )}
        </div>

        {/* --- DISEASE DETAILS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {data.disease_data?.description && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-3 text-green-600 flex items-center">
                  <AlertTriangle className="mr-2" /> Description
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  {formatText(data.disease_data.description)}
                </div>
              </div>
            )}
            {data.disease_data?.symptoms && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-3 text-green-600 flex items-center">
                  <Bug className="mr-2" /> Symptoms
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  {formatText(data.disease_data.symptoms)}
                </div>
              </div>
            )}
          </div>
          <div className="rounded-3xl flex flex-col space-y-6">
            {data.disease_data?.causes && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-3 text-purple-600 flex items-center">
                  <Lightbulb className="mr-2" /> Causes
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  {formatText(data.disease_data.causes)}
                </div>
              </div>
            )}
            {data.disease_data?.spread_mechanisms && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-3 text-blue-600 flex items-center">
                  <Wind className="mr-2" /> How It Spreads
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  {formatText(data.disease_data.spread_mechanisms)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- UPDATED CARE RECOMMENDATIONS SECTION --- */}
        {Array.isArray(data.disease_data?.care_advices) &&
          data.disease_data.care_advices.length > 0 && (
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-green-700 flex items-center">
                <Leaf className="mr-3 w-7 h-7" /> Care Recommendations
              </h2>
              <div className="space-y-4">
                {data.disease_data.care_advices.map((item, index) => (
                  <CareAdviceItem key={index} item={item} index={index} />
                ))}
              </div>
            </div>
          )}

        <div className="flex justify-center">
          <button
            className="bg-green-700 text-white py-5 px-5 rounded-xl font-semibold cursor-pointer"
            onClick={() => {
              navigate("/diagnosis");
            }}
          >
            Diagnose Another Plant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
