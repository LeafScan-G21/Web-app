
import React, { useState } from "react";


const HistoryCard = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative group bg-white shadow-md rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl transition-all border border-green-100">
        <div className="relative">
          <img
            src={item.image_url}
            alt="leaf"
            className="w-28 h-28 rounded-xl object-cover border-2 border-green-200 shadow-sm group-hover:scale-105 transition-transform duration-200"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-green-700/70 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-white text-xs font-semibold">View Full Image</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              {item.prediction}
            </span>
            <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs">
              {(item.confidence * 100).toFixed(1)}% confidence
            </span>
            {item.disease && (
              <span className="inline-block px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                {item.disease}
              </span>
            )}
            {item.plant && (
              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                {item.plant}
              </span>
            )}
          </div>
          <div className="text-gray-700 text-sm truncate">
            <span className="font-medium">Timestamp:</span> {new Date(item.timestamp || item.created_at).toLocaleString()}
          </div>
        </div>
        <button
          className="ml-auto px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition"
          onClick={() => setShowModal(true)}
        >
          Details
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-green-700 text-xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={item.image_url}
              alt="leaf full"
              className="w-full h-64 object-contain rounded-xl border mb-4"
            />
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-green-700">Prediction:</span> {item.prediction}
              </div>
              <div>
                <span className="font-semibold text-emerald-700">Confidence:</span> {(item.confidence * 100).toFixed(1)}%
              </div>
              {item.disease && (
                <div>
                  <span className="font-semibold text-pink-700">Disease:</span> {item.disease}
                </div>
              )}
              {item.plant && (
                <div>
                  <span className="font-semibold text-yellow-700">Plant:</span> {item.plant}
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-700">Timestamp:</span> {new Date(item.timestamp || item.created_at).toLocaleString()}
              </div>
              {item.description && (
                <div>
                  <span className="font-semibold text-blue-700">Description:</span> {item.description}
                </div>
              )}
              {item.treatment && (
                <div>
                  <span className="font-semibold text-green-700">Treatment:</span> {item.treatment}
                </div>
              )}
              {item.notes && (
                <div>
                  <span className="font-semibold text-gray-700">Notes:</span> {item.notes}
                </div>
              )}
              {item._id && (
                <div className="text-xs text-gray-400">ID: {item._id}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryCard;
