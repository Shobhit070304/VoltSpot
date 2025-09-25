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
        const res = await api.get(`/station/search?query=${query}`);
        setSuggestions(res.data);
      } catch (err) {
        setSuggestions([]);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return suggestions;
}

export default useGlobalAutocomplete;
