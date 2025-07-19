import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  MapPin,
  Zap,
  Heart,
  X,
  Star,
  Map,
  TrendingUp,
  Clock,
  Battery,
  Sparkles,
  ArrowRight,
  Play,
  Users,
  Activity,
  Award,
} from "lucide-react";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("name"); // name, rating, power
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await api.get("/station");
        if (response.status === 200) {
          setStations(response.data);
          toast.success("Stations loaded successfully");
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      connectorType: "",
      minPower: "",
      maxPower: "",
    });
  };

  const handleSaveStation = async (stationId) => {
    try {
      const response = await api.post(`/station/save/${stationId}`);
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

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || station.status === filters.status;
    const matchesConnector =
      !filters.connectorType || station.connectorType === filters.connectorType;
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

  // Sort stations
  const sortedStations = [...filteredStations].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.averageRating || 0) - (a.averageRating || 0);
      case "power":
        return b.powerOutput - a.powerOutput;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Calculate stats
  const stats = {
    total: stations.length,
    active: stations.filter(s => s.status === "Active").length,
    averagePower: stations.reduce((sum, s) => sum + s.powerOutput, 0) / stations.length || 0,
    averageRating: stations.reduce((sum, s) => sum + (s.averageRating || 0), 0) / stations.length || 0
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-hidden pt-20">
      {/* Subtle Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[50rem] h-[50rem] bg-indigo-900/10 rounded-full blur-[150px] opacity-20 animate-float"></div>
        <div className="absolute bottom-[20%] right-[25%] w-[45rem] h-[45rem] bg-cyan-900/10 rounded-full blur-[130px] opacity-15 animate-float-delay"></div>
      </div>

      {/* Header Section */}
      <header className="relative z-10 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/20 backdrop-blur-sm border border-indigo-800/30 text-[0.6rem] font-light tracking-wider text-indigo-300 mb-6">
              <Sparkles className="h-2.5 w-2.5 mr-1.5" />
              EV CHARGING NETWORK
            </div>
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              <span className="text-white">Find Your Perfect</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                Charging Station
              </span>
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto font-light tracking-wide leading-relaxed mb-8">
              Discover electric vehicle charging stations with real-time
              availability, advanced filtering, and smart recommendations
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <MapPin className="h-4 w-4" />, value: stats.total, label: "Total Stations" },
                { icon: <Activity className="h-4 w-4" />, value: stats.active, label: "Active Now" },
                { icon: <Battery className="h-4 w-4" />, value: `${stats.averagePower.toFixed(1)}kW`, label: "Avg Power" },
                { icon: <Star className="h-4 w-4" />, value: stats.averageRating.toFixed(1), label: "Avg Rating" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-indigo-900/30 rounded-lg mb-2 mx-auto border border-indigo-800/30">
                    <div className="text-indigo-400">{stat.icon}</div>
                  </div>
                  <div className="text-lg font-medium text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400 font-light tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/map"
              className="group bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-4 hover:border-indigo-600/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-10 h-10 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-3 border border-indigo-800/30">
                    <Map className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">Map View</h3>
                  <p className="text-xs text-gray-400 font-light tracking-wide">Explore stations on map</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
              </div>
            </Link>

            <Link
              to="/saved-stations"
              className="group bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl border border-green-800/30 p-4 hover:border-green-600/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center mb-3 border border-green-800/30">
                    <Heart className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">Saved Stations</h3>
                  <p className="text-xs text-gray-400 font-light tracking-wide">Your favorite locations</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-green-400 transition-colors" />
              </div>
            </Link>

            <Link
              to="/dashboard"
              className="group bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl border border-purple-800/30 p-4 hover:border-purple-600/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center mb-3 border border-purple-800/30">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">Analytics</h3>
                  <p className="text-xs text-gray-400 font-light tracking-wide">View detailed insights</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
              </div>
            </Link>
          </div>
        </div>

        {/* Search & Filter Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 mb-12 shadow-xl">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-gray-400 transition-colors" />
              <input
                type="text"
                placeholder="Search by location or station name..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-transparent text-sm font-light tracking-wide"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-800/50 rounded-xl text-sm font-light tracking-wide text-gray-300 bg-gray-900/70 hover:bg-gray-800/50 transition-all"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-800/50 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-light text-gray-400 uppercase tracking-wider">
                  Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2.5 bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-lg text-white text-xs font-light tracking-wide focus:outline-none focus:ring-1 focus:ring-gray-700"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-light text-gray-400 uppercase tracking-wider">
                  Connector Type
                </label>
                <select
                  name="connectorType"
                  value={filters.connectorType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2.5 bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-lg text-white text-xs font-light tracking-wide focus:outline-none focus:ring-1 focus:ring-gray-700"
                >
                  <option value="">All Types</option>
                  {connectorTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-light text-gray-400 uppercase tracking-wider">
                  Min Power (kW)
                </label>
                <input
                  type="number"
                  name="minPower"
                  value={filters.minPower}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full px-3 py-2.5 bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-lg text-white placeholder-gray-600 text-xs font-light tracking-wide focus:outline-none focus:ring-1 focus:ring-gray-700"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-light text-gray-400 uppercase tracking-wider">
                  Max Power (kW)
                </label>
                <input
                  type="number"
                  name="maxPower"
                  value={filters.maxPower}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full px-3 py-2.5 bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-lg text-white placeholder-gray-600 text-xs font-light tracking-wide focus:outline-none focus:ring-1 focus:ring-gray-700"
                />
              </div>

              <div className="md:col-span-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center text-xs font-light tracking-wide text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <X className="h-3 w-3 mr-1.5" />
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-light text-white tracking-tight">
              {sortedStations.length} stations found
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-light tracking-wider">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-lg text-white text-xs font-light tracking-wide px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-700"
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="power">Power Output</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-light tracking-wider">View:</span>
            <div className="flex bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid" 
                    ? "bg-indigo-600 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list" 
                    ? "bg-indigo-600 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="w-4 h-4 space-y-0.5">
                  <div className="w-full h-1.5 bg-current rounded-sm"></div>
                  <div className="w-full h-1.5 bg-current rounded-sm"></div>
                  <div className="w-full h-1.5 bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-700 border-t-indigo-500"></div>
          </div>
        ) : sortedStations.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"}>
            {sortedStations.map((station) => (
              <div
                key={station._id}
                className={`bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 hover:bg-gray-800/50 transition-all group ${
                  viewMode === "list" ? "p-4" : "p-6"
                }`}
              >
                {viewMode === "grid" ? (
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-light text-white mb-2 group-hover:text-gray-300 transition-colors">
                          {station.name}
                        </h3>
                        <div className="flex items-center text-xs text-gray-400 mb-1.5 font-light tracking-wide">
                          <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                          {station.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-400 font-light tracking-wide">
                          <Zap className="h-3 w-3 mr-2 text-gray-500" />
                          {station.powerOutput} kW • {station.connectorType}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 text-xs font-light tracking-wide rounded-full ${
                            station.status === "Active"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          }`}
                        >
                          {station.status}
                        </span>

                        <button
                          onClick={() => handleSaveStation(station._id)}
                          className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors ${
                              user?.savedStations.includes(station._id)
                                ? "text-red-400 fill-current"
                                : "text-gray-500 hover:text-red-400"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= (station?.averageRating || 0)
                                  ? "text-gray-300 fill-current"
                                  : "text-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-light tracking-wide">
                          {station.averageRating?.toFixed(1) || "0.0"}
                        </span>
                      </div>

                      <Link
                        to={`/station/${station._id}`}
                        className="inline-flex items-center text-xs font-light tracking-wide text-gray-300 hover:text-white transition-colors"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-white mb-2 group-hover:text-gray-300 transition-colors">
                        {station.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-400 mb-1.5 font-light tracking-wide">
                        <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                        {station.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-400 font-light tracking-wide">
                        <Zap className="h-3 w-3 mr-2 text-gray-500" />
                        {station.powerOutput} kW • {station.connectorType}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 text-xs font-light tracking-wide rounded-full ${
                          station.status === "Active"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        }`}
                      >
                        {station.status}
                      </span>

                      <button
                        onClick={() => handleSaveStation(station._id)}
                        className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            user?.savedStations.includes(station._id)
                              ? "text-red-400 fill-current"
                              : "text-gray-500 hover:text-red-400"
                          }`}
                        />
                      </button>

                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= (station?.averageRating || 0)
                                  ? "text-gray-300 fill-current"
                                  : "text-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-light tracking-wide mr-4">
                          {station.averageRating?.toFixed(1) || "0.0"}
                        </span>
                      </div>

                      <Link
                        to={`/station/${station._id}`}
                        className="inline-flex items-center text-xs font-light tracking-wide text-gray-300 hover:text-white transition-colors"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-800/50 p-12 inline-block max-w-md">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-800/30">
                <Search className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                No stations found
              </h3>
              <p className="text-sm text-gray-400 mb-8 font-light tracking-wide leading-relaxed">
                {searchTerm || Object.values(filters).some(f => f) 
                  ? "Try adjusting your search or filter criteria to find matching stations"
                  : "No charging stations are currently available in your area"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium tracking-wide rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear all filters
                </button>
                <Link
                  to="/map"
                  className="inline-flex items-center px-6 py-3 border border-gray-700 text-sm font-medium tracking-wide rounded-lg text-gray-300 bg-white/5 hover:bg-white/10 transition-all duration-200"
                >
                  <Map className="mr-2 h-4 w-4" />
                  View on Map
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
