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
    return 'text-red-600 bg-red-50';
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
    // <div className="min-h-screen bg-gray-50 p-6">
    //   <div className="max-w-6xl mx-auto">
    //     {/* Header with Navigation */}
    //     <div className="flex items-center justify-between mb-8">
    //       <div className="flex items-center space-x-4">
    //         <button
    //           onClick={() => navigate('/diagnosis')}
    //           className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
    //         >
    //           <ArrowLeft className="w-5 h-5" />
    //           <span>Back to Diagnosis</span>
    //         </button>
    //         <div className="h-6 w-px bg-gray-300"></div>
    //         <button
    //           onClick={() => navigate('/dashboard')}
    //           className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
    //         >
    //           <Home className="w-5 h-5" />
    //           <span>Home</span>
    //         </button>
    //       </div>
    //     </div>

    //     {/* Page Title */}
    //     <div className="text-center mb-8">
    //       <h1 className="text-4xl font-bold text-gray-800 mb-2">Plant Disease Diagnosis Results</h1>
    //       <p className="text-gray-600">AI-powered plant disease detection analysis</p>
    //     </div>

    //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //       {/* Left Column - Image and Confidence */}
    //       <div className="lg:col-span-1 space-y-6">
    //         {/* Plant Image */}
    //         <div className="bg-white rounded-2xl shadow-lg p-6">
    //           <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    //             <Leaf className="mr-2 text-green-600" size={24} />
    //             Analyzed Image
    //           </h2>
    //           <div className="relative">
    //             <img 
    //               src={data.cloudinary_url || data.image_url} 
    //               alt="Plant diagnosis"
    //               className="w-full h-64 object-cover rounded-xl shadow-md"
    //               onError={(e) => {
    //                 e.target.style.display = 'none';
    //                 e.target.nextSibling.style.display = 'flex';
    //               }}
    //             />
    //             <div className="hidden w-full h-64 bg-gray-200 rounded-xl items-center justify-center">
    //               <div className="text-center text-gray-500">
    //                 <Leaf className="w-12 h-12 mx-auto mb-2" />
    //                 <p>Image not available</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Confidence Score */}
    //         <div className="bg-white rounded-2xl shadow-lg p-6">
    //           <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    //             <Eye className="mr-2 text-blue-600" size={24} />
    //             Confidence Score
    //           </h2>
    //           <div className={`text-center p-4 rounded-xl ${getConfidenceColor(data.confidence)}`}>
    //             <div className="text-3xl font-bold mb-2">
    //               {(data.confidence * 100).toFixed(1)}%
    //             </div>
    //             <p className="text-sm font-medium">Diagnosis Confidence</p>
    //           </div>
    //         </div>

    //         {/* Disease Info Card */}
    //         <div className="bg-white rounded-2xl shadow-lg p-6">
    //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Disease Identified</h2>
    //           <div className="text-center">
    //             <h3 className="text-2xl font-bold text-red-600 mb-2">
    //               {data.disease_data?.disease_name || 'Unknown Disease'}
    //             </h3>
    //             <p className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">
    //               {data.disease_data?.plant_name || 'Unknown Plant'}
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Right Column - Disease Details */}
    //       <div className="lg:col-span-2 space-y-6">
    //         {/* Description */}
    //         {data.disease_data?.description && (
    //           <div className="bg-white rounded-2xl shadow-lg p-6">
    //             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    //               <AlertTriangle className="mr-2 text-orange-600" size={24} />
    //               Disease Description
    //             </h2>
    //             <div className="text-gray-700 leading-relaxed">
    //               {formatText(data.disease_data.description)}
    //             </div>
    //           </div>
    //         )}

    //         {/* Symptoms */}
    //         {data.disease_data?.symptoms && (
    //           <div className="bg-white rounded-2xl shadow-lg p-6">
    //             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    //               <Bug className="mr-2 text-red-600" size={24} />
    //               Symptoms
    //             </h2>
    //             <div className="text-gray-700 leading-relaxed">
    //               {formatText(data.disease_data.symptoms)}
    //             </div>
    //           </div>
    //         )}

    //         {/* Causes */}
    //         {data.disease_data?.causes && (
    //           <div className="bg-white rounded-2xl shadow-lg p-6">
    //             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    //               <Lightbulb className="mr-2 text-purple-600" size={24} />
    //               Causes
    //             </h2>
    //             <div className="text-gray-700 leading-relaxed">
    //               {formatText(data.disease_data.causes)}
    //             </div>
    //           </div>
    //         )}

    //         {/* Spread Mechanisms */}
    //         {data.disease_data?.spread_mechanisms && (
    //           <div className="bg-white rounded-2xl shadow-lg p-6">
    //             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    //               <Wind className="mr-2 text-blue-600" size={24} />
    //               How It Spreads
    //             </h2>
    //             <div className="text-gray-700 leading-relaxed">
    //               {formatText(data.disease_data.spread_mechanisms)}
    //             </div>
    //           </div>
    //         )}

    //         {/* Care Advice */}
    //         {Array.isArray(data.disease_data?.care_advices) && (
    //           <div className="bg-white rounded-2xl shadow-lg p-6">
    //             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    //               <Lightbulb className="mr-2 text-green-600" size={24} />
    //               Treatment & Care Advice
    //             </h2>
    //             <div className="space-y-4">
    //               {data.disease_data.care_advices.map((item, index) => (
    //                 <div 
    //                   key={index} 
    //                   className="p-4 bg-green-50 rounded-xl border-l-4 border-green-500"
    //                 >
    //                   <p className="text-gray-800 font-medium">{item.advice}</p>
    //                   {item.relevance_reason && (
    //                     <p className="text-sm text-gray-600 mt-2">
    //                       <span className="font-semibold">Why:</span> {item.relevance_reason}
    //                     </p>
    //                   )}
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     {/* Weather Forecast */}
    //     {data.weather?.data?.forecast && (
    //       <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
    //         <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    //           <Cloud className="mr-2 text-blue-600" size={24} />
    //           Weather Forecast - {data.weather.data.location || 'Current Location'}
    //         </h2>
    //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    //           {data.weather.data.forecast.map((day, index) => (
    //             <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
    //               <p className="font-semibold text-gray-800 mb-3">{formatDate(day.date)}</p>
                  
    //               <div className="space-y-3">
    //                 <div className="flex items-center justify-center">
    //                   <Thermometer className="mr-2 text-red-500" size={16} />
    //                   <span className="text-sm">
    //                     {day.min_temp}° - {day.max_temp}°C
    //                   </span>
    //                 </div>
                    
    //                 <div className="flex items-center justify-center">
    //                   <Droplets className="mr-2 text-blue-500" size={16} />
    //                   <span className="text-sm">{day.humidity}%</span>
    //                 </div>
                    
    //                 <div className="flex items-center justify-center">
    //                   <Wind className="mr-2 text-gray-500" size={16} />
    //                   <span className="text-sm">{day.wind_speed} km/h</span>
    //                 </div>
                    
    //                 <div className="flex items-center justify-center">
    //                   <Sun className="mr-2 text-yellow-500" size={16} />
    //                   <span className="text-sm">UV {day.uv_index}</span>
    //                   <div className={`w-2 h-2 rounded-full ml-1 ${getUVColor(day.uv_index)}`}></div>
    //                 </div>
                    
    //                 <div className="flex items-center justify-center">
    //                   <Cloud className="mr-2 text-gray-400" size={16} />
    //                   <span className="text-sm">{day.cloud_cover.toFixed(0)}%</span>
    //                 </div>

    //                 {day.rain > 0 && (
    //                   <div className="flex items-center justify-center">
    //                     <Droplets className="mr-2 text-blue-600" size={16} />
    //                     <span className="text-sm">{day.rain}mm</span>
    //                   </div>
    //                 )}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}

    //     {/* Action Buttons */}
    //     <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
    //       <button
    //         onClick={() => navigate('/diagnosis')}
    //         className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
    //       >
    //         <Leaf className="w-5 h-5" />
    //         <span>Analyze Another Plant</span>
    //       </button>
          
    //       <button
    //         onClick={() => window.print()}
    //         className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
    //       >
    //         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-7a2 2 0 00-2-2H9a2 2 0 00-2 2v7a2 2 0 002 2z" />
    //         </svg>
    //         <span>Print Results</span>
    //       </button>
    //     </div>

    //     {/* Additional Tips */}
    //     <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
    //       <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
    //         <Lightbulb className="mr-2" size={20} />
    //         Additional Care Tips
    //       </h3>
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
    //         <div className="bg-white rounded-lg p-4">
    //           <h4 className="font-medium mb-2">Monitor Weather Conditions</h4>
    //           <p>High humidity and warm temperatures can accelerate disease spread. Consider the weather forecast when planning treatments.</p>
    //         </div>
    //         <div className="bg-white rounded-lg p-4">
    //           <h4 className="font-medium mb-2">Regular Inspection</h4>
    //           <p>Check your plants regularly for early signs of disease. Early detection and treatment are key to preventing spread.</p>
    //         </div>
    //         <div className="bg-white rounded-lg p-4">
    //           <h4 className="font-medium mb-2">Proper Hygiene</h4>
    //           <p>Always clean your gardening tools between plants and dispose of infected plant material properly.</p>
    //         </div>
    //         <div className="bg-white rounded-lg p-4">
    //           <h4 className="font-medium mb-2">Seek Expert Advice</h4>
    //           <p>For severe infections or if you're unsure about treatment, consult with local agricultural extension services or plant pathologists.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

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