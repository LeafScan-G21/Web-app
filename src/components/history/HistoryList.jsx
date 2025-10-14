import React, { useEffect, useState, useMemo } from "react";
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
  // Debounce search input
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
      } catch (error) {
        setError("Error fetching history");
        console.error("Error fetching history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  const handleFilter = (sortBy) => {
    let sorted = [...history];
    if (sortBy === "confidence") {
      sorted.sort((a, b) => b.confidence - a.confidence);
    } else {
      sorted.sort(
        (a, b) =>
          new Date(b.timestamp || b.created_at) -
          new Date(a.timestamp || a.created_at)
      );
    }
    setHistory(sorted);
  };

  // Filtered history by search (disease or plant, partial, case-insensitive)
  const filteredHistory = useMemo(() => {
    if (!debouncedSearch) return history;
    const q = debouncedSearch.toLowerCase();
    return history.filter(
      (item) =>
        (item.disease && item.disease.toLowerCase().includes(q)) ||
        (item.plant && item.plant.toLowerCase().includes(q))
    );
  }, [history, debouncedSearch]);

  if (loading) return <HistoryLoader />;

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (history.length === 0) {
    return <p className="text-center text-gray-500">No history found</p>;
  }

  return (
    <div>
      {/* Search input */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-80 bg-gradient-to-r from-green-100 to-emerald-50 rounded-lg px-3 py-2 border border-green-200 shadow-sm">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by disease or plant name..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
        <HistoryFilters onFilter={handleFilter} />
      </div>
      {filteredHistory.length === 0 ? (
        <div className="text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-4 my-6">
          No results for your search.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item, index) => (
            <HistoryCard key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
