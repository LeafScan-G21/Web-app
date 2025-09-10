import React from "react";

const HistoryCard = ({ item }) => (
  <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition">
    <img
      src={item.image_url}
      alt="leaf"
      className="w-24 h-24 rounded-lg object-cover border"
    />
    <div className="flex-1">
      <p className="font-semibold text-green-700">Prediction: {item.prediction}</p>
      <p className="text-sm text-gray-600">
        Confidence: {(item.confidence * 100).toFixed(1)}%
      </p>
      <p className="text-xs text-gray-400">
        {new Date(item.timestamp || item.created_at).toLocaleString()}
      </p>
    </div>
  </div>
);

export default HistoryCard;
