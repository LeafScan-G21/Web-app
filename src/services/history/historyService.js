const API_URL = `${import.meta.env.VITE_HISTORY_SERVICE_URL}/history`;


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
  // Guard: don't call backend when userId is empty (prevents hitting frontend index.html)
  if (!userId) {
    console.warn("getUserHistory called without userId");
    return [];
  }

  try {
    console.log("Fetching history for user:", userId);
    const response = await fetch(`${API_URL}/${userId}`);

    // Log the full response for debugging
    const text = await response.text();
    console.log("Response content:", text);

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      console.error(`History API returned HTTP ${response.status}:`, text);
      throw new Error(`History API error: ${response.status} ${response.statusText}`);
    }

    if (contentType.includes("application/json")) {
      const data = JSON.parse(text);
      console.log("History response:", data);
      return data;
    }

    // If we get here the server returned something other than JSON (often HTML). Help the dev by logging it.
    console.error("Unexpected non-JSON response when fetching history:", text.slice(0, 200));
    throw new Error("Unexpected response format when fetching history");
  } catch (err) {
    console.error("Failed to fetch history", err);
    return [];
  }
};
