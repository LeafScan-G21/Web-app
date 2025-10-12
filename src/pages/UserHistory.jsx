import React from "react";
import HistoryList from "../components/history/HistoryList";
import { useAuth } from "../context/AuthContext";

const UserHistoryPage = () => {
  const { user } = useAuth();
  const userId = user?.id || ""; // replace 'id' with actual field from AuthContext

  return (
    <>
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-green-200 via-emerald-100 to-green-400 min-h-screen w-full h-full"></div>
      <div className="relative min-h-screen py-10 px-4 overflow-x-hidden z-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-green-300 rounded-full opacity-30 blur-2xl pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-300 rounded-full opacity-20 blur-3xl pointer-events-none z-0"></div>
        <div className="max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8 border border-green-100 relative z-10">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            My Diagnosis History
          </h1>
          <HistoryList userId={userId} />
        </div>
      </div>
    </>
  );
};

export default UserHistoryPage;
