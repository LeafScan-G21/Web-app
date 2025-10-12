import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "heroicons-react";
import { useAuth } from "../context/AuthContext";

const ViewHistoryButton = () => {
  const { user } = useAuth();
  const userId = user?.id || "";

  return (
    <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
      <Link to={`/user-history?userId=${userId}`}>
        <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          My Diagnosis History
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          View my past plant disease predictions
        </p>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
          View History
        </button>
      </Link>
    </div>
  );
};

export default ViewHistoryButton;