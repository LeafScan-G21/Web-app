import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cloud, Thermometer, Droplets, Wind, Sun, Eye, AlertTriangle, Lightbulb, Bug, Leaf, ArrowLeft, Home } from 'lucide-react';

const Prediction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get data from navigation state first, then from sessionStorage
    let predictionData = location.state?.predictionData;
    
    if (!predictionData) {
      const storedData = sessionStorage.getItem('predictionResult');
      if (storedData) {
        try {
          predictionData = JSON.parse(storedData);
        } catch (error) {
          console.error('Error parsing stored prediction data:', error);
        }
      }
    }

    if (predictionData) {
      setData(predictionData);
      setLoading(false);
    } else {
      // No prediction data available, redirect back to diagnosis
      navigate('/diagnosis', { replace: true });
    }

    // Clean up sessionStorage after loading
    return () => {
      sessionStorage.removeItem('predictionResult');
    };
  }, [location.state, navigate]);

  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">{line}</p>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getConfidenceColor = (confidence) => {
    const percentage = confidence * 100;
    if (percentage >= 90) return 'text-white bg-green-500';
    if (percentage >= 70) return 'text-white bg-yellow-500';
    return 'bg-red-500';
  };

  const getUVColor = (uvIndex) => {
    if (uvIndex <= 2) return 'bg-green-500';
    if (uvIndex <= 5) return 'bg-yellow-500';
    if (uvIndex <= 7) return 'bg-orange-500';
    if (uvIndex <= 10) return 'bg-red-500';
    return 'bg-purple-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prediction results...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Prediction Data Found</h2>
          <p className="text-gray-600 mb-4">Please upload an image first to get a diagnosis.</p>
          <button
            onClick={() => navigate('/diagnosis')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Diagnosis Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
  <div className="max-w-7xl mx-auto space-y-8">

    {/* --- HERO SECTION --- */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Plant Image + Disease Info */}
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <img 
            src={data.cloudinary_url || data.image_url} 
            alt="Plant"
            className="h-80 lg:h-full w-full object-cover"
          />
        </div>
        <div className="lg:w-1/2 p-6 flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold text-red-700 text-center justify-center items-center">{data.disease_data?.disease_name || 'Unknown Disease'}</h1>
          <p className="text-lg text-gray-700 text-center justify-center items-center">
            Plant: <span className="font-semibold">{data.disease_data?.plant_name || 'Unknown Plant'}</span>
          </p>
          <div className={`inline-block px-5 py-2 mx-5 rounded-full items-center justify-center text-center font-semibold text-white ${getConfidenceColor(data.confidence)}`}>
            {(data.confidence * 100).toFixed(1)}% Confidence
          </div>
        </div>
      </div>

      {/* Weather Forecast */}
      {data.weather?.data?.forecast && (
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-semibold flex items-center mb-4 text-blue-700">
            <Cloud className="mr-2" /> 7-Day Forecast
          </h2>
          <div className="flex flex-col space-y-4 overflow-y-auto max-h-96">
            {data.weather.data.forecast.map((day, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded-xl text-center shadow-sm">
                <p className="font-semibold">{formatDate(day.date)}</p>
                <p className="text-sm text-gray-600">{day.min_temp}° - {day.max_temp}°C</p>
                <p className="text-sm text-blue-600">{day.humidity}% Humidity</p>
                <p className="text-sm text-gray-500">{day.wind_speed} km/h</p>
              </div>
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
            <h2 className="text-xl font-semibold mb-3 text-orange-600 flex items-center">
              <AlertTriangle className="mr-2" /> Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{formatText(data.disease_data.description)}</p>
          </div>
        )}
        {data.disease_data?.symptoms && (
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-3 text-red-600 flex items-center">
              <Bug className="mr-2" /> Symptoms
            </h2>
            <p className="text-gray-700 leading-relaxed">{formatText(data.disease_data.symptoms)}</p>
          </div>
        )}
        {data.disease_data?.causes && (
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-3 text-purple-600 flex items-center">
              <Lightbulb className="mr-2" /> Causes
            </h2>
            <p className="text-gray-700 leading-relaxed">{formatText(data.disease_data.causes)}</p>
          </div>
        )}
        {data.disease_data?.spread_mechanisms && (
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 flex items-center">
              <Wind className="mr-2" /> How It Spreads
            </h2>
            <p className="text-gray-700 leading-relaxed">{formatText(data.disease_data.spread_mechanisms)}</p>
          </div>
        )}
      </div>

      {/* Care Recommendations */}
      {Array.isArray(data.disease_data?.care_advices) && (
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center">
            <Lightbulb className="mr-2" /> Care Recommendations
          </h2>
          <div className="space-y-5 overflow-y-auto ">
            {data.disease_data.care_advices.map((item, index) => (
              <div key={index} className="flex items-start bg-green-50 border-l-4 border-green-500 p-4 rounded-xl space-x-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{item.advice}</p>
                  {item.relevance_reason && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Why:</span> {item.relevance_reason}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

  </div>
</div>

  );
};

export default Prediction;