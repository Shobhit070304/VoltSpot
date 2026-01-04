import { Filter, ChevronDown, X } from "lucide-react";
import GlobalSearch from "../widgets/GlobalSearch";

const SearchFilterCard = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  filters,
  handleFilterChange,
  clearFilters,
  connectorTypes,
  showSuggestions,
  setShowSuggestions,
}) => (
  <div className="glass-panel p-4 mb-8 border-white/5">
    <div className="flex flex-col md:flex-row gap-3">
      <GlobalSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="btn-secondary flex items-center justify-center gap-2 !py-2 !px-4 text-[10px] font-bold uppercase tracking-widest"
      >
        <Filter size={14} className="text-brand-primary" />
        Filters
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
        />
      </button>
    </div>

    {showFilters && (
      <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary transition-colors"
          >
            <option value="" className="bg-midnight">All Statuses</option>
            <option value="Active" className="bg-midnight">Active</option>
            <option value="Inactive" className="bg-midnight">Inactive</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            Connector
          </label>
          <select
            name="connectorType"
            value={filters.connectorType}
            onChange={handleFilterChange}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary transition-colors"
          >
            <option value="" className="bg-midnight">All Types</option>
            {connectorTypes.map((type) => (
              <option key={type} value={type} className="bg-midnight">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            Min Power
          </label>
          <input
            type="number"
            name="minPower"
            value={filters.minPower}
            onChange={handleFilterChange}
            placeholder="kW"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            Max Power
          </label>
          <input
            type="number"
            name="maxPower"
            value={filters.maxPower}
            onChange={handleFilterChange}
            placeholder="kW"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        <div className="lg:col-span-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white flex items-center gap-2 transition-colors"
          >
            <X size={12} />
            Clear filters
          </button>
        </div>
      </div>
    )}
  </div>
);

export default SearchFilterCard;
