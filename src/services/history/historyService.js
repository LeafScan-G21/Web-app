const API_URL = `${import.meta.env.VITE_BACKEND_URL}/history`;


export const addHistoryRecord = async (record) => {
  try {
    const response = await fetch(`${API_URL}/history`, {
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
  // Guard: don't call backend when userId is empty (prevents hitting frontend index.html)
  if (!userId) {
    console.warn("getUserHistory called without userId");
    return [];
  }

  try {
    console.log("Fetching history for user:", userId);
    const response = await fetch(`${API_URL}/history/${userId}`);
    const data = await response.json();
    console.log("History response:", data);
    return data;
  } catch (err) {
    console.error("Failed to fetch history", err);
    return [];
  }
};
