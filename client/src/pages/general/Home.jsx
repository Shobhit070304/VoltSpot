import { useEffect, useState, useMemo, useCallback } from "react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Home/Header";
import QuickStats from "../../components/Home/QuickStats";
import QuickActions from "../../components/Home/QuickActions";
import SearchFilterCard from "../../components/Home/SearchFilterCard";
import StationsList from "../../components/Home/StationsList";
import Pagination from "../../components/Home/Pagination";
import NoStationsFound from "../../components/Home/NoStationsFound";
import LoadingSpinner from "../../components/fallback/LoadingSpinner";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    connectorType: "",
    minPower: "",
    maxPower: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const { user, setUser } = useAuth();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await api.get("/station");
        if (response.status === 200) {
          setStations(response.data.stations);
          toast.success("Stations loaded successfully");
        }
      } catch {
        toast.error("Error fetching stations");
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      status: "",
      connectorType: "",
      minPower: "",
      maxPower: "",
    });
  }, []);

  const handleSaveStation = useCallback(
    async (stationId) => {
      try {
        const response = await api.post(`/station/save/${stationId}`);
        if (response.status === 200) {
          toast.success(response.data.message);
          setUser((prevUser) => ({
            ...prevUser,
            savedStations: response.data.savedStations,
          }));
        }
      } catch (error) {
        toast.error("Failed to save station");
      }
    },
    [setUser],
  );

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const matchesSearch =
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        !filters.status || station.status === filters.status;
      const matchesConnector =
        !filters.connectorType ||
        station.connectorType === filters.connectorType;
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
  }, [stations, searchTerm, filters]);

  const sortedStations = useMemo(() => {
    return [...filteredStations].sort((a, b) => {
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
  }, [filteredStations, sortBy]);

  const paginatedData = useMemo(() => {
    const totalPages = Math.ceil(sortedStations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedStations.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
    return { totalPages, currentItems };
  }, [sortedStations, currentPage, itemsPerPage]);

  const stats = useMemo(
    () => ({
      total: stations.length,
      active: stations.filter((s) => s.status === "Active").length,
      averagePower:
        stations.reduce((sum, s) => sum + s.powerOutput, 0) / stations.length ||
        0,
      averageRating:
        stations.reduce((sum, s) => sum + (s.averageRating || 0), 0) /
          stations.length || 0,
    }),
    [stations],
  );

  return (
    <div
      onClick={() => setShowSuggestions(false)}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 text-gray-900 overflow-hidden pt-16"
    >
      {/* Animated Gradient BG */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
        <div className="absolute top-[50%] left-[50%] w-[18rem] h-[18rem] bg-yellow-200/20 rounded-full blur-[60px] opacity-30 animate-pulse"></div>
      </div>

      <header className="relative z-10 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 pt-10">
          <Header />
          <QuickStats stats={stats} />
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-6">
        <QuickActions />
        <SearchFilterCard
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          handleFilterChange={handleFilterChange}
          clearFilters={clearFilters}
          connectorTypes={connectorTypes}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />

        <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              {sortedStations.length} stations found
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-orange-500 font-medium tracking-wider">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-orange-100 rounded-lg text-gray-900 text-xs font-medium tracking-wide px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-300"
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
                className={`p-1 rounded-md transition-all ${
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
                className={`p-1 rounded-md transition-all ${
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
          <LoadingSpinner size="lg" className="h-64" />
        ) : sortedStations.length > 0 ? (
          <>
            <Pagination
              currentPage={currentPage}
              totalPages={paginatedData.totalPages}
              setCurrentPage={setCurrentPage}
            />
            <StationsList
              stations={paginatedData.currentItems}
              viewMode={viewMode}
              handleSaveStation={handleSaveStation}
              user={user}
            />
          </>
        ) : (
          <NoStationsFound
            setSearchTerm={setSearchTerm}
            setFilters={setFilters}
            setShowFilters={setShowFilters}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
