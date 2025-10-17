import React from "react";
import { Leaf, Sparkles } from 'lucide-react';

const HistoryLoader = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-100 via-emerald-50 to-green-50 animate-pulse"></div>

          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-green-500 border-r-emerald-400 animate-spin"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Leaf className="w-12 h-12 text-green-600 animate-pulse" />
          </div>

          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-emerald-400 animate-bounce" />
          <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-green-400 animate-bounce delay-300" style={{ animationDelay: '0.3s' }} />
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Loading Your Journey
        </h3>

        <div className="flex justify-center items-center space-x-2 mb-6">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        <div className="w-64 mx-auto bg-green-50 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
        </div>

        <p className="text-gray-500 text-sm mt-4">Gathering your plant health records...</p>
      </div>
    </div>
  );
};

export default HistoryLoader;
