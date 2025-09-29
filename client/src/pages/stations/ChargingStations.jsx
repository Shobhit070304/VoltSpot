import React, { useMemo, useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  ChevronDown,
  Edit,
  Trash2,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// Connector types for filter dropdown
const connectorTypes = [
  "Type 1",
  "Type 2",
  "CCS",
  "CHAdeMO",
  "CCS/CHAdeMO",
  "Tesla",
];

const ChargingStations = ({ stations, setStations, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    connectorType: "",
    minPower: "",
    maxPower: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Handle delete station
  const handleDeleteStation = async (id) => {
    if (!confirm("Are you sure you want to delete this charging station?")) {
      return;
    }

    try {
      const response = await api.delete(`/station/delete/${id}`);
      if (response.status === 200) {
        toast.success("Station deleted successfully");
        setStations(stations.filter((station) => station._id !== id));
      } else {
        toast.error("Error deleting station");
      }
    } catch (err) {
      toast.error("Failed to delete station");
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      status: "",
      connectorType: "",
      minPower: "",
      maxPower: "",
    });
  };

  // Filter stations
  const filteredStations = stations.filter((station) => {
    // Search filter
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = !filters.status || station.status === filters.status;

    // Connector type filter
    const matchesConnector =
      !filters.connectorType || station.connectorType === filters.connectorType;

    // Power output range filter
    const matchesMinPower =
      !filters.minPower || station.powerOutput >= Number(filters.minPower);
    const matchesMaxPower =
      !filters.maxPower || station.powerOutput <= Number(filters.maxPower);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesConnector &&
      matchesMinPower &&
      matchesMaxPower
    );
  });

  return (
    <div className="relative p-6">
      {/* Header with Add Station button */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Charging Stations
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your network of charging stations
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => onEdit(null)}
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg shadow-md hover:shadow-orange-500/20 transition-all text-sm font-medium"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Station
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-100 shadow-sm mb-6">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2.5 border border-orange-100 rounded-lg text-sm font-medium bg-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              />
            </div>
            <div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto inline-flex items-center px-4 py-2.5 border border-orange-100 rounded-lg text-sm font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2 text-orange-500" />
                Filters
                <ChevronDown
                  className={`h-4 w-4 ml-2 text-orange-500 transition-transform ${showFilters ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Filter options */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="status"
                  className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2.5 border border-orange-100 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="connectorType"
                  className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1"
                >
                  Connector Type
                </label>
                <select
                  id="connectorType"
                  name="connectorType"
                  value={filters.connectorType}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2.5 border border-orange-100 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
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
                <label
                  htmlFor="minPower"
                  className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1"
                >
                  Min Power (kW)
                </label>
                <input
                  type="number"
                  id="minPower"
                  name="minPower"
                  value={filters.minPower}
                  onChange={handleFilterChange}
                  placeholder="Min kW"
                  min="0"
                  className="block w-full px-3 py-2.5 border border-orange-100 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="maxPower"
                  className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1"
                >
                  Max Power (kW)
                </label>
                <input
                  type="number"
                  id="maxPower"
                  name="maxPower"
                  value={filters.maxPower}
                  onChange={handleFilterChange}
                  placeholder="Max kW"
                  min="0"
                  className="block w-full px-3 py-2.5 border border-orange-100 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Station list */}
      {filteredStations.length > 0 ? (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-100 shadow-sm overflow-hidden">
          <ul className="divide-y divide-orange-100">
            {filteredStations.map((station) => (
              <li
                key={station._id}
                className="hover:bg-orange-50/50 transition-colors"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center border ${station.status === "Active"
                          ? "bg-green-100 text-green-600 border-green-200"
                          : "bg-yellow-100 text-yellow-600 border-yellow-200"
                          }`}
                      >
                        <Zap className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {station.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {station.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(station)}
                        className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-100/50 rounded-lg transition-colors"
                        aria-label="Edit station"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStation(station._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100/50 rounded-lg transition-colors"
                        aria-label="Delete station"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 sm:flex sm:justify-between">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${station.status === "Active"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          }`}
                      >
                        {station.status}
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                        {station.powerOutput} kW
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        {station.connectorType}
                      </span>
                    </div>
                    <Link
                      to={`/station/${station._id}`}
                      className="mt-3 sm:mt-0 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-800 transition-colors"
                    >
                      View details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-100 shadow-sm py-12 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 border border-orange-200">
            <Zap className="h-5 w-5 text-orange-500" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">
            No charging stations found
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {Object.values(filters).some(Boolean)
              ? "No stations match your current filters."
              : "No stations available in your network."}
          </p>
          {Object.values(filters).some(Boolean) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChargingStations;
