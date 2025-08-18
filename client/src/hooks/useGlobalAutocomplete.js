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
        const res = await api.get(`/station/suggest?query=${query}`);
        console.log("Suggestions", res.data);
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return suggestions;
}

export default useGlobalAutocomplete;
