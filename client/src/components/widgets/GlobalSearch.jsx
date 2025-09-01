import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import useGlobalAutocomplete from "../../hooks/useGlobalAutocomplete";
import { Search } from "lucide-react";

function GlobalSearch({ showSuggestions, setShowSuggestions }) {
  const [query, setQuery] = useState("");
  const suggestions = useGlobalAutocomplete(query);
  useEffect(() => {
    setShowSuggestions(suggestions?.length > 0);
  }, [suggestions, setShowSuggestions]);
  return (
    <div className="relative flex-1 group">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400 group-focus-within:text-orange-500 transition-colors" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stations..."
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-orange-100 rounded-xl text-gray-900 placeholder-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-transparent text-sm font-light tracking-wide"
      />

      {showSuggestions && suggestions?.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border rounded-md shadow mt-1 z-50">
          {suggestions?.map((station) => (
            <li key={station?._id}>
              <Link
                to={`/station/${station?._id}`}
                className="block px-3 py-2 hover:bg-orange-100 dark:hover:bg-gray-700"
                onClick={() => setQuery("")}
              >
                <p className="font-medium">{station?.name}</p>
                <p className="text-xs text-gray-500">{station?.location}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(GlobalSearch);
