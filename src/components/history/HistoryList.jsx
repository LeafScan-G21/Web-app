import React, { useEffect, useState } from "react";
import { getUserHistory } from "../../services/history/historyService";

const HistoryList = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getUserHistory(userId);
      setHistory(data);
    };
    fetchHistory();
  }, [userId]);

  return (
    <div>
      <h2>Your History</h2>
      {history.length === 0 && <p>No history found</p>}
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            <img src={item.image_url} alt="leaf" width={100} />
            <p>Prediction: {item.prediction}</p>
            <p>Confidence: {(item.confidence * 100).toFixed(1)}%</p>
            <p>Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
