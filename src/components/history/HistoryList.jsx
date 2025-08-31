import React, { useEffect, useState } from "react";
import { getUserHistory } from "../../services/history/historyService";
import HistoryCard from "./HistoryCard.jsx";
import HistoryLoader from "./HistoryLoader.jsx";
import HistoryFilters from "./HistoryFilters.jsx";

const HistoryList = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    setHistory(sorted);
  };

  if (loading) return <HistoryLoader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (history.length === 0) {
    return <p className="text-center text-gray-500">No history found</p>;
  }

  return (
    <div>
      <HistoryFilters onFilter={handleFilter} />
      <div className="space-y-4">
        {history.map((item, index) => (
          <HistoryCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
