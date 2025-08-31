import React from "react";
import HistoryList from "../components/history/HistoryList";
import { useAuth } from "../context/AuthContext";

const UserHistoryPage = () => {
  const { user } = useAuth();
  const userId = user?.id || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          My Diagnosis History
        </h1>
        <HistoryList userId={userId} />
      </div>
    </div>
  );
};

export default UserHistoryPage;
