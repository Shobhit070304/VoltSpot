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
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stations..."
        className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all text-xs font-medium"
      />

      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 glass-panel overflow-hidden z-50 animate-fade-in border-white/10 shadow-2xl">
          <ul className="py-1">
            {suggestions?.map((station) => (
              <li key={station?._id}>
                <Link
                  to={`/station/${station?._id}`}
                  className="block px-4 py-2.5 hover:bg-white/5 transition-colors"
                  onClick={() => setQuery("")}
                >
                  <p className="text-xs font-bold text-white mb-0.5">{station?.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{station?.location}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default memo(GlobalSearch);
