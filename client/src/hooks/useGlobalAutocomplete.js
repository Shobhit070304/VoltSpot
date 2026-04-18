import { useState, useEffect } from "react";
import { api } from "../services/api";

function useGlobalAutocomplete(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await api.get(`/stations/search?query=${query}`);
        setSuggestions(res.data.data);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return suggestions;
}

export default useGlobalAutocomplete;
