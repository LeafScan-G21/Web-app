import React from "react";
import { ArrowDownUp } from 'lucide-react';

const HistoryFilters = ({ onFilter, sortBy }) => {
  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">
        Sort history
      </label>
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
        <ArrowDownUp className="w-4 h-4 text-green-600" />
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onFilter(e.target.value)}
          className="bg-transparent text-sm font-medium text-gray-700 cursor-pointer focus:outline-none appearance-none pr-2"
        >
          <option value="date">Latest First</option>
          <option value="confidence">Highest Confidence</option>
        </select>
        <svg
          className="w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default HistoryFilters;
