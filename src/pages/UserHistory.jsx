import React, { useEffect } from "react";
import { Sprout, TrendingUp, FileText } from 'lucide-react';
import HistoryList from "../components/history/HistoryList";
import { useAuth } from "../context/AuthContext";

const UserHistoryPage = () => {
  const { user } = useAuth();
  const userId = user?.id || "";

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwxOTcsOTQsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-br from-green-100 to-emerald-100">
          <div className="text-center mb-12 sm:mb-16 bg-gradient-to-br from-green-100 to-emerald-100">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-3xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Sprout className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 bg-clip-text text-transparent">
              Your Diagnosis History
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Track your plant health journey and review past analyses with detailed insights
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-gray-700">Confidence Tracking</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <FileText className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Detailed Reports</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 lg:p-10">
            <HistoryList userId={userId} />
          </div>
      </div>
    </div>
  );
};

export default UserHistoryPage;
