import React from "react";
import HistoryList from "../components/history/HistoryList";

const HistoryTest = () => {
  return (
    <div style={{ padding: 32 }}>
      <h1>Test User History</h1>
      <HistoryList userId="Test1" />
    </div>
  );
};

export default HistoryTest;
