import { useState } from "react";

const HistoryFilters = ({ onFilter }) => {
  const [sortBy, setSortBy] = useState("date");

  const handleChange = (e) => {
    setSortBy(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="flex justify-end mb-4">
      <select
        value={sortBy}
        onChange={handleChange}
        className="border rounded-lg p-2 text-sm"
      >
        <option value="date">Sort by Date</option>
        <option value="confidence">Sort by Confidence</option>
      </select>
    </div>
  );
};

export default HistoryFilters;
