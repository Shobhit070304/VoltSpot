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
  fetchingLocation,
}) => (
  <div className="glass-panel p-3.5 mb-8 border-white/5">
    <div className="flex flex-col md:flex-row gap-3">
      <GlobalSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="btn-secondary flex items-center justify-center gap-2 !py-2 !px-4 text-[9px] font-bold uppercase tracking-widest"
      >
        <Filter size={12} className="text-brand-primary" />
        Filters
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
        />
      </button>
    </div>

    {showFilters && (
      <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-[13px] text-white focus:outline-none focus:border-brand-primary transition-colors font-medium"
          >
            <option value="" className="bg-midnight">All Statuses</option>
            <option value="Active" className="bg-midnight">Active</option>
            <option value="Inactive" className="bg-midnight">Inactive</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Connector
          </label>
          <select
            name="connectorType"
            value={filters.connectorType}
            onChange={handleFilterChange}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-[13px] text-white focus:outline-none focus:border-brand-primary transition-colors font-medium"
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
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Min Power
          </label>
          <input
            type="number"
            name="minPower"
            value={filters.minPower}
            onChange={handleFilterChange}
            placeholder="kW"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-colors font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Max Power
          </label>
          <input
            type="number"
            name="maxPower"
            value={filters.maxPower}
            onChange={handleFilterChange}
            placeholder="kW"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-colors font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Sort by Distance
          </label>
          <div className="flex items-center h-[38px]">
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                name="sortByDistance"
                checked={filters.sortByDistance || false}
                onChange={handleFilterChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              <span className="ml-3 text-[13px] font-medium text-slate-400 peer-checked:text-white">
                {fetchingLocation ? "Locating..." : (filters.sortByDistance ? "Nearest First" : "Disabled")}
              </span>
            </label>
          </div>
        </div>

        <div className={`space-y-1.5 transition-all duration-300 ${filters.sortByDistance ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Search Radius
          </label>
          <select
            name="maxDistance"
            value={filters.maxDistance}
            onChange={handleFilterChange}
            disabled={!filters.sortByDistance}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-[13px] text-white focus:outline-none focus:border-brand-primary transition-colors font-medium disabled:cursor-not-allowed"
          >
            <option value="10000" className="bg-midnight">10 km</option>
            <option value="25000" className="bg-midnight">25 km</option>
            <option value="50000" className="bg-midnight">50 km</option>
            <option value="100000" className="bg-midnight">100 km</option>
            <option value="500000" className="bg-midnight">500 km</option>
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-end">
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
