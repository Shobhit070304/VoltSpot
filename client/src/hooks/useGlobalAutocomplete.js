import { useState, useEffect } from "react";
import { api } from "../services/api";

function useGlobalAutocomplete(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let active = true;

    if (!query) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await api.get(`/stations/search?query=${query}`);
        if (active) {
          setSuggestions(res.data.data || []);
        }
      } catch {
        if (active) {
          setSuggestions([]);
        }
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(delayDebounce);
    };
  }, [query]);

  return suggestions;
}

export default useGlobalAutocomplete;
