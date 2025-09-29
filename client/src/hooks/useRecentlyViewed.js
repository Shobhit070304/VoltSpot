import { useEffect, useState } from "react";

const STORAGE_KEY = "recentStations";

function useRecentlyViewed() {
  const [recentStations, setRecentStations] = useState([]);

  useEffect(() => {
    const storedStations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setRecentStations(storedStations);
  }, []);

  const addStation = (station) => {
    setRecentStations((prev) => {
      const filtered = prev.filter((s) => s._id !== station._id);
      const updated = [station, ...filtered].slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };
  return { recentStations, addStation };
}

export default useRecentlyViewed;
