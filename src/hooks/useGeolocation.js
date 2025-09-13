import { useState, useEffect } from "react";

export default function useGeolocation() {
  const [location, setLocation] = useState(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem("location");
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have a location (from localStorage), don't ask again
    if (location) return;
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(loc);
        localStorage.setItem("location", JSON.stringify(loc)); // Save for future visits
      },
      (err) => setError(err.message)
    );
  }, [location]);

  return { location, error };
}
