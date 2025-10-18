import React, { useState } from "react";
import { Calendar, TrendingUp, Leaf, AlertCircle, X, Droplets } from 'lucide-react';

const HistoryCard = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const confidenceColor =
    item.confidence >= 0.8
      ? 'from-green-500 to-emerald-600'
      : item.confidence >= 0.6
      ? 'from-yellow-500 to-amber-600'
      : 'from-orange-500 to-red-600';

  const formattedDate = new Date(item.timestamp || item.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = new Date(item.timestamp || item.created_at).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-green-50 to-emerald-50 flex-shrink-0">
            <img
              src={item.image_url}
              alt="Plant diagnosis"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-300 animate-pulse" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <button
              onClick={() => setShowModal(true)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-800 shadow-lg">
                View Details
              </span>
            </button>
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {item.plant && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                    <Leaf className="w-3.5 h-3.5" />
                    {item.plant}
                  </span>
                )}
                {item.disease && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {item.disease}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Confidence
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {(item.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${confidenceColor} rounded-full transition-all duration-500`}
                      style={{ width: `${item.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
                <span className="text-gray-300">•</span>
                <span>{formattedTime}</span>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-gradient-to-b from-white to-white/95 backdrop-blur-sm px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Diagnosis Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 mb-6">
                <img
                  src={item.image_url}
                  alt="Plant diagnosis full view"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {item.plant && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Leaf className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">Plant Type</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{item.plant}</p>
                  </div>
                )}

                {item.disease && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">Detected Issue</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{item.disease}</p>
                  </div>
                )}

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Confidence Level</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-gray-800">
                      {(item.confidence * 100).toFixed(1)}%
                    </p>
                    <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${confidenceColor} rounded-full`}
                        style={{ width: `${item.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Analyzed On</span>
                  </div>
                  <p className="text-base font-medium text-gray-800">
                    {formattedDate} at {formattedTime}
                  </p>
                </div>
              </div>

              {item.description && (
                <div className="bg-blue-50 rounded-xl p-5 mb-4 border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                    Description
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              )}

              {item.treatment && (
                <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                    <Droplets className="w-5 h-5 text-green-600" />
                    Recommended Treatment
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{item.treatment}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryCard;
