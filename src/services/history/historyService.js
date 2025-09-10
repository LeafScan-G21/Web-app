const API_URL = "http://localhost:8000/history";

export const addHistoryRecord = async (record) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });
    return await response.json();
  } catch (err) {
    console.error("Failed to add history record", err);
    return null;
  }
};


export const getUserHistory = async (userId) => {
  try {
    console.log("Fetching history for user:", userId);
    const response = await fetch(`${API_URL}/${userId}`);
    const data = await response.json();
    console.log("History response:", data);
    return data;
  } catch (err) {
    console.error("Failed to fetch history", err);
    return [];
  }
};