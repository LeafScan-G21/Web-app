import React from "react";
import { Database, BarChart3, Archive, Search } from "lucide-react";

const DiseaseDataLoader = ({ message = "Loading disease database..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
            {/* Animated background pulse */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-200 to-emerald-200 animate-pulse"></div>

            {/* Rotating loader ring */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-green-500 border-r-green-400 animate-spin"></div>

            {/* Main icon with bounce animation */}
            <div className="relative z-10 animate-bounce">
              <Database size={32} className="text-green-600" />
            </div>

            {/* Floating dots */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping animation-delay-200"></div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Loading Disease Data
          </h1>

          {/* Animated loading dots */}
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-[100ms]"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-[200ms]"></div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-green-100 rounded-full h-2 mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
          </div>

          <p className="text-gray-600 text-sm">{message}</p>
        </div>

        {/* Additional disease data-specific elements */}
        <div className="space-y-2 text-sm text-gray-500">
          <p className="animate-pulse flex items-center gap-2">
            <BarChart3 size={16} className="text-green-600" />
            Fetching disease records...
          </p>
          <p className="animate-pulse delay-[500ms] flex items-center gap-2">
            <Archive size={16} className="text-green-600" />
            Loading database entries...
          </p>
          <p className="animate-pulse delay-[1000ms] flex items-center gap-2">
            <Search size={16} className="text-green-600" />
            Preparing search filters...
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDataLoader;
