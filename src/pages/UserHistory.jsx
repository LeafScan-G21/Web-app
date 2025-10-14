import React from "react";
import { History, Clock } from "lucide-react";
import HistoryList from "../components/history/HistoryList";
import { useAuth } from "../context/AuthContext";

const UserHistoryPage = () => {
  const { user } = useAuth();
  const userId = user?.id || ""; // replace 'id' with actual field from AuthContext

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <History className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Diagnosis History
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your plant health journey and review past diagnoses
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <HistoryList userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default UserHistoryPage;
