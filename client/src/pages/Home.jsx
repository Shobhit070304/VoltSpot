import React, { useEffect, useState } from "react";
import {
  FaBolt,
  FaChevronRight,
  FaLocationArrow,
  FaPlug,
  FaSearch,
} from "react-icons/fa";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Filter,
  Heart,
  HeartIcon,
  HeartOff,
  Save,
  Search,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Connector types for filter dropdown
const connectorTypes = [
  "Type 1",
  "Type 2",
  "CCS",
  "CHAdeMO",
  "CCS/CHAdeMO",
  "Tesla",
];

const Home = () => {
  const [stations, setStations] = useState([]);
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

  const { user, setUser } = useAuth();

  // Status colors mapping
  const statusColors = {
    Active: "bg-emerald-100 text-emerald-800",
    Maintenance: "bg-amber-100 text-amber-800",
    Inactive: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await api.get("/station");
        if (response.status === 200) {
          setStations(response.data);
          toast.success("Stations fetched successfully");
        }
      } catch (error) {
        setError(error);
        toast.error("Error fetching stations");
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

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

  // Handle saving a station
  const handleSaveStation = async (stationId) => {
    try {
      const response = await api.post(`/station/save/${stationId}`);
      console.log("Save stations", response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          savedStations: response.data.savedStations,
        }));
      } else {
        toast.error("Error saving station");
      }
    } catch (error) {
      toast.error("Error saving station");
    }
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
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden pt-[20vh]">
      {/* Background glow effects - same as landing page */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-900/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-900/20 rounded-full filter blur-[100px]"></div>
      </div>

      {/* Hero Section - matching landing page style */}
      <section className="max-w-7xl mx-auto px-6 py-5 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 leading-tight">
          Explore EV Charging Stations
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Find and compare electric vehicle charging stations near you with
          real-time availability.
        </p>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
        {/* Search and Filters Card - styled to match landing page components */}
        <div className="bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm mb-8 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-sm font-medium text-gray-200 bg-gray-700/50 hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <Filter className="h-5 w-5 mr-2 text-gray-400" />
              Filters
              <ChevronDown
                className={`h-5 w-5 ml-2 text-gray-400 transition-transform ${
                  showFilters ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Status Filter */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" className="bg-gray-800">
                    All Statuses
                  </option>
                  <option value="Active" className="bg-gray-800">
                    Active
                  </option>
                  <option value="Inactive" className="bg-gray-800">
                    Inactive
                  </option>
                </select>
              </div>

              {/* Connector Type Filter */}
              <div>
                <label
                  htmlFor="connectorType"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Connector Type
                </label>
                <select
                  id="connectorType"
                  name="connectorType"
                  value={filters.connectorType}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" className="bg-gray-800">
                    All Types
                  </option>
                  {connectorTypes.map((type) => (
                    <option key={type} value={type} className="bg-gray-800">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Power Range Filters */}
              <div>
                <label
                  htmlFor="minPower"
                  className="block text-sm font-medium text-gray-300 mb-2"
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
                  className="block w-full pl-3 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="maxPower"
                  className="block text-sm font-medium text-gray-300 mb-2"
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
                  className="block w-full pl-3 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Clear Filters Button */}
              <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stations List Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Available Stations
            </h2>
            <span className="text-sm text-gray-400">
              {filteredStations.length}{" "}
              {filteredStations.length === 1 ? "station" : "stations"} found
            </span>
          </div>

          {/* Stations List */}
          {filteredStations.length > 0 ? (
            <div className="space-y-4">
              {filteredStations.map((station) => (
                <div
                  key={station._id}
                  className="rounded-xl border border-gray-700 bg-gray-700/20 backdrop-blur-lg hover:bg-gray-800/50 transition-all duration-300 p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    {/* Station Info */}
                    <div className="flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                          station.status === "Active"
                            ? "bg-green-900/30 text-green-400 border border-green-800"
                            : "bg-yellow-900/30 text-yellow-400 border border-yellow-800"
                        }`}
                      >
                        <FaPlug className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {station.name}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2">
                          <div className="flex items-center text-sm text-gray-400">
                            <FaLocationArrow className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
                            {station.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <FaBolt className="flex-shrink-0 mr-1.5 h-4 w-4 text-amber-400" />
                            {station.powerOutput} kW • {station.connectorType}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status and Details */}
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          station.status === "Active"
                            ? "bg-green-900/30 text-green-400 border border-green-800"
                            : "bg-yellow-900/30 text-yellow-400 border border-yellow-800"
                        }`}
                      >
                        {station.status.charAt(0).toUpperCase() +
                          station.status.slice(1)}
                      </span>
                      <Link
                        to={`/station/${station._id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      >
                        View Details{" "}
                        <FaChevronRight className="inline ml-1" size={12} />
                      </Link>
                      {/* Save Station Button */}
                      {user && user.savedStations.includes(station._id) ? (
                        <button
                          onClick={() => handleSaveStation(station._id)}
                          className="ml-2 focus:outline-none"
                        >
                          <HeartIcon fill="red" className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSaveStation(station._id)}
                          className="ml-2 text-gray-400 hover:text-gray-300 focus:outline-none"
                        >
                          <Heart className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm p-12 text-center">
              <div className="mx-auto h-24 w-24 text-gray-500">
                <FaSearch className="w-full h-full" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">
                No stations found
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <div className="mt-6">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
