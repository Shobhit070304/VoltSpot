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
  Twitter,
} from "lucide-react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import GlobalSearch from "../../components/widgets/GlobalSearch";

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
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    active: stations.filter((s) => s.status === "Active").length,
    averagePower:
      stations.reduce((sum, s) => sum + s.powerOutput, 0) / stations.length ||
      0,
    averageRating:
      stations.reduce((sum, s) => sum + (s.averageRating || 0), 0) /
        stations.length || 0,
  };

  return (
    <div
      onClick={() => setShowSuggestions(!showSuggestions)}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 text-gray-900 overflow-hidden pt-16"
    >
      {/* Subtle Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
        <div className="absolute top-[50%] left-[50%] w-[18rem] h-[18rem] bg-yellow-200/20 rounded-full blur-[60px] opacity-30 animate-pulse"></div>
      </div>

      {/* Header Section */}
      <header className="relative z-10 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 pt-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium mb-2">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              EV CHARGING NETWORK
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3">
              <span className="text-gray-900">Find Your Perfect</span>{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Charging Station
              </span>
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto mb-6">
              Discover electric vehicle charging stations, search and explore ev
              charging stations with real-time info and simple filters.
            </p>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                {
                  icon: <MapPin className="h-4 w-4" />,
                  value: stats.total,
                  label: "Total Stations",
                },
                {
                  icon: <Activity className="h-4 w-4" />,
                  value: stats.active,
                  label: "Active Now",
                },
                {
                  icon: <Battery className="h-4 w-4" />,
                  value: `${stats.averagePower.toFixed(1)}kW`,
                  label: "Avg Power",
                },
                {
                  icon: <Star className="h-4 w-4" />,
                  value: stats.averageRating.toFixed(1),
                  label: "Avg Rating",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 rounded-xl border border-orange-100 p-3 text-center shadow-sm"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg mb-1 mx-auto">
                    <div className="text-orange-500">{stat.icon}</div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link
              to="/map"
              className="group bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border border-orange-200 p-4 hover:border-orange-300 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center mb-2">
                    <Map className="h-4 w-4 text-orange-500" />
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                    Map View
                  </h3>
                  <p className="text-xs text-gray-500">
                    Explore stations on map
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-orange-400 group-hover:text-orange-600 transition-colors" />
              </div>
            </Link>
            <Link
              to="/saved-stations"
              className="group bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border border-orange-200 p-4 hover:border-orange-300 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center mb-2">
                    <Heart className="h-4 w-4 text-orange-500" />
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                    Saved Stations
                  </h3>
                  <p className="text-xs text-gray-500">
                    Your favorite locations
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-orange-400 group-hover:text-orange-600 transition-colors" />
              </div>
            </Link>
            <Link
              to="/dashboard"
              className="group bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border border-orange-200 p-4 hover:border-orange-300 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center mb-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                    Dashboard
                  </h3>
                  <p className="text-xs text-gray-500">Manage your stations</p>
                </div>
                <ArrowRight className="h-4 w-4 text-orange-400 group-hover:text-orange-600 transition-colors" />
              </div>
            </Link>
          </div>
        </div>

        {/* Search & Filter Card */}
        <div className="bg-white/80 rounded-2xl border border-orange-100 p-5 mb-10 shadow-md">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-3">
            <GlobalSearch
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
            />

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center px-4 py-2 border border-orange-100 rounded-xl text-xs font-medium tracking-wide text-orange-700 bg-orange-50 hover:bg-orange-100 transition-all"
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
            <div className="mt-5 pt-5 border-t border-orange-100 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-light text-gray-400 uppercase tracking-wider">
                  Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2.5 backdrop-blur-sm border border-gray-800/50 rounded-lg text-black text-xs font-light tracking-wide focus:outline-none focus:ring-1 focus:ring-gray-700"
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
                  className="w-full px-3 py-2.5 backdrop-blur-sm border border-gray-800/50 rounded-lg text-black text-xs font-light tracking-wide focus:outline-none focus:ring-1 focus:ring-gray-700"
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
                  className="w-full px-3 py-2.5 backdrop-blur-sm border border-gray-800/50 rounded-lg text-black placeholder-gray-600 text-xs font-light tracking-wide focus:outline-none focus:ring-1 focus:ring-gray-700"
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
                  className="w-full px-3 py-2.5  backdrop-blur-sm border border-gray-800/50 rounded-lg text-black placeholder-gray-600 text-xs font-light tracking-wide focus:outline-none focus:ring-1 focus:ring-gray-700"
                />
              </div>

              <div className="md:col-span-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center text-xs font-light tracking-wide text-gray-600 hover:text-gray-500 transition-colors"
                >
                  <X className="h-3 w-3 mr-1.5" />
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
              {sortedStations.length} stations found
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-orange-500 font-medium tracking-wider">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-orange-100 rounded-lg text-gray-900 text-xs font-medium tracking-wide px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-300"
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="power">Power Output</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-orange-500 font-medium tracking-wider">
              View:
            </span>
            <div className="flex bg-white border border-orange-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-white"
                    : "text-orange-400 hover:text-orange-600"
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
                    ? "bg-orange-500 text-white"
                    : "text-orange-400 hover:text-orange-600"
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
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-200 border-t-orange-500"></div>
          </div>
        ) : sortedStations.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 lg:grid-cols-2 gap-5"
                : "space-y-3"
            }
          >
            {sortedStations.map((station) => (
              <div
                key={station._id}
                className={`bg-white/80 rounded-xl border border-orange-100 hover:bg-orange-50 transition-all group ${
                  viewMode === "list" ? "p-4" : "p-5"
                }`}
              >
                {viewMode === "grid" ? (
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                          {station.name}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 mb-1 font-medium">
                          <MapPin className="h-3 w-3 mr-2 text-orange-400" />
                          {station.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 font-medium">
                          <Zap className="h-3 w-3 mr-2 text-orange-400" />
                          {station.powerOutput} kW • {station.connectorType}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            station.status === "Active"
                              ? "bg-green-500/20 text-green-500 border border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                          }`}
                        >
                          {station.status}
                        </span>
                        <button
                          onClick={() => handleSaveStation(station._id)}
                          className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors ${
                              user?.savedStations?.includes(station._id)
                                ? "text-red-400 fill-current"
                                : "text-orange-300 hover:text-red-400"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-orange-100">
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= (station?.averageRating || 0)
                                  ? "text-orange-500 fill-current"
                                  : "text-orange-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-orange-400 font-medium">
                          {station.averageRating?.toFixed(1) || "0.0"}
                        </span>
                      </div>
                      <Link
                        to={`/station/${station._id}`}
                        className="inline-flex items-center text-xs font-medium tracking-wide text-orange-700 hover:text-orange-900 transition-colors"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                        {station.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mb-1 font-medium">
                        <MapPin className="h-3 w-3 mr-2 text-orange-400" />
                        {station.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 font-medium">
                        <Zap className="h-3 w-3 mr-2 text-orange-400" />
                        {station.powerOutput} kW • {station.connectorType}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          station.status === "Active"
                            ? "bg-green-500/20 text-green-500 border border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                        }`}
                      >
                        {station.status}
                      </span>
                      <button
                        onClick={() => handleSaveStation(station._id)}
                        className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            user?.savedStations.includes(station._id)
                              ? "text-red-400 fill-current"
                              : "text-orange-300 hover:text-red-400"
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
                                  ? "text-orange-500 fill-current"
                                  : "text-orange-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-orange-400 font-medium mr-4">
                          {station.averageRating?.toFixed(1) || "0.0"}
                        </span>
                      </div>
                      <Link
                        to={`/station/${station._id}`}
                        className="inline-flex items-center text-xs font-medium tracking-wide text-orange-700 hover:text-orange-900 transition-colors"
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
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl border border-orange-200 p-10 inline-block max-w-md">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-amber-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-7 w-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No stations found
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-medium">
                {searchTerm || Object.values(filters).some((f) => f)
                  ? "Try adjusting your search or filter criteria to find matching stations"
                  : "No charging stations are currently available in your area"}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-5 py-2 border border-transparent text-xs font-medium tracking-wide rounded-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear all filters
                </button>
                <Link
                  to="/map"
                  className="inline-flex items-center px-5 py-2 border border-orange-200 text-xs font-medium tracking-wide rounded-lg text-orange-700 bg-white hover:bg-orange-50 transition-all duration-200"
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
