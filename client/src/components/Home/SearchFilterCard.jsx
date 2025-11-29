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
  <div className="bg-white/80 rounded-xl border border-orange-100 p-4 mb-6 shadow-md">
    <div className="flex flex-col lg:flex-row gap-2">
      <GlobalSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="inline-flex items-center justify-center px-3 py-1.5 border border-orange-100 rounded-lg text-xs font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 transition-all"
      >
        <Filter className="h-3 w-3 mr-1" />
        Filters
        <ChevronDown
          className={`h-3 w-3 ml-1 transition-transform ${showFilters ? "rotate-180" : ""}`}
        />
      </button>
    </div>
    {showFilters && (
      <div className="mt-4 pt-4 border-t border-orange-100 grid grid-cols-1 md:grid-cols-4 gap-2">
        <div>
          <label className="block text-[10px] font-light text-gray-400 uppercase tracking-wider">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full px-2 py-2 border border-gray-800/30 rounded text-xs"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-light text-gray-400 uppercase tracking-wider">
            Connector
          </label>
          <select
            name="connectorType"
            value={filters.connectorType}
            onChange={handleFilterChange}
            className="w-full px-2 py-2 border border-gray-800/30 rounded text-xs"
          >
            <option value="">All Types</option>
            {connectorTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-light text-gray-400 uppercase tracking-wider">
            Min Power (kW)
          </label>
          <input
            type="number"
            name="minPower"
            value={filters.minPower}
            onChange={handleFilterChange}
            placeholder="Min"
            className="w-full px-2 py-2 border border-gray-800/30 rounded text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-light text-gray-400 uppercase tracking-wider">
            Max Power (kW)
          </label>
          <input
            type="number"
            name="maxPower"
            value={filters.maxPower}
            onChange={handleFilterChange}
            placeholder="Max"
            className="w-full px-2 py-2 border border-gray-800/30 rounded text-xs"
          />
        </div>
        <div className="md:col-span-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="inline-flex items-center text-xs font-light text-gray-600 hover:text-gray-500"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </button>
        </div>
      </div>
    )}
  </div>
);

export default SearchFilterCard;
