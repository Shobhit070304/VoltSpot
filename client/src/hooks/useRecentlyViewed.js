import { useEffect, useState } from "react";

const STORAGE_KEY = "recentStations";

function useRecentlyViewed() {
  const [recentStations, setRecentStations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentStations));
  }, [recentStations]);

  const addStation = (station) => {
    setRecentStations((prev) => {
      const filtered = prev.filter((s) => s._id !== station._id);
      return [station, ...filtered].slice(0, 5);
    });
  };
  return { recentStations, addStation };
}

export default useRecentlyViewed;
