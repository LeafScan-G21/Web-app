import React, { useEffect, useState, useMemo } from "react";
import { Search, Sparkles } from 'lucide-react';
import { getUserHistory } from "../../services/history/historyService";
import HistoryCard from "./HistoryCard.jsx";
import HistoryFilters from "./HistoryFilters.jsx";
import HistoryLoader from "../loaders/HistoryLoader.jsx";

const HistoryList = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (!userId) return;
    const fetchHistory = async () => {
      try {
        const data = await getUserHistory(userId);
        setHistory(data);
      } catch (err) {
        setError('Unable to load history. Please try again.');
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  const handleFilter = (sortByValue) => {
    setSortBy(sortByValue);
    const sorted = [...history];
    if (sortByValue === 'confidence') {
      sorted.sort((a, b) => b.confidence - a.confidence);
    } else {
      sorted.sort(
        (a, b) =>
          new Date(b.timestamp || b.created_at).getTime() -
          new Date(a.timestamp || a.created_at).getTime()
      );
    }
    setHistory(sorted);
  };

  const filteredHistory = useMemo(() => {
    if (!debouncedSearch) return history;
    const query = debouncedSearch.toLowerCase();
    return history.filter(
      (item) =>
        (item.disease && item.disease.toLowerCase().includes(query)) ||
        (item.plant && item.plant.toLowerCase().includes(query))
    );
  }, [history, debouncedSearch]);

  if (loading) return <HistoryLoader />;

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">No History Yet</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Start your plant health journey by uploading your first leaf image for diagnosis.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
            Upload Your First Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by plant or disease name..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
          />
        </div>
        <HistoryFilters onFilter={handleFilter} sortBy={sortBy} />
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-12 px-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
          <div className="max-w-md mx-auto">
            <svg
              className="w-16 h-16 text-amber-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Results Found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
