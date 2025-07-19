import { useState, useEffect } from "react";
import { api } from "../services/api";
import { 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  MapPin,
  Activity,
  Star,
  Sparkles
} from "lucide-react";
import ChargingStations from "./ChargingStations";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await api.get("/station/me");

        if (response.status === 200) {
          const stationsData = response.data.stations || [];
          setStations(stationsData);

          const statsData = {
            totalStations: stationsData.length,
            activeStations: stationsData.filter(
              (station) => station.status === "Active"
            ).length,
            inactiveStations: stationsData.filter(
              (station) => station.status === "Inactive"
            ).length,
            avgPowerOutput:
              stationsData.length > 0
                ? stationsData.reduce(
                    (sum, station) => sum + (station.powerOutput || 0),
                    0
                  ) / stationsData.length
                : 0,
            totalPower: stationsData.reduce(
              (sum, station) => sum + (station.powerOutput || 0),
              0
            ),
            avgRating: stationsData.length > 0
              ? stationsData.reduce(
                  (sum, station) => sum + (station.averageRating || 0),
                  0
                ) / stationsData.length
              : 0,
          };
          setStats(statsData);
        }
      } catch (error) {
        setError(error);
        toast.error(error.message || "Error fetching stations");
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-[15%] left-[20%] w-[50rem] h-[50rem] bg-indigo-900/10 rounded-full blur-[150px] opacity-20 animate-float"></div>
          <div className="absolute bottom-[20%] right-[25%] w-[45rem] h-[45rem] bg-cyan-900/10 rounded-full blur-[130px] opacity-15 animate-float-delay"></div>
        </div>

        {/* Loading Spinner */}
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-800 border-t-indigo-500 mb-4"></div>
          <p className="text-sm text-gray-400 font-light tracking-wide">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-[15%] left-[20%] w-[50rem] h-[50rem] bg-indigo-900/10 rounded-full blur-[150px] opacity-20 animate-float"></div>
          <div className="absolute bottom-[20%] right-[25%] w-[45rem] h-[45rem] bg-cyan-900/10 rounded-full blur-[130px] opacity-15 animate-float-delay"></div>
        </div>

        {/* Error Card */}
        <div className="bg-red-900/30 backdrop-blur-xl rounded-xl border border-red-800/50 p-6 max-w-md mx-6 relative z-10">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-200 mb-1">
                Error Loading Dashboard
              </h3>
              <p className="text-xs text-red-300 font-light tracking-wide leading-relaxed">
                {error.message ||
                  "Failed to fetch dashboard data. Please try again later."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center px-3 py-1.5 text-xs font-light tracking-wide rounded-lg border border-red-800/50 text-red-300 bg-red-900/20 hover:bg-red-900/30 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden py-20">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[15%] left-[20%] w-[50rem] h-[50rem] bg-indigo-900/10 rounded-full blur-[150px] opacity-20 animate-float"></div>
        <div className="absolute bottom-[20%] right-[25%] w-[45rem] h-[45rem] bg-cyan-900/10 rounded-full blur-[130px] opacity-15 animate-float-delay"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/20 backdrop-blur-sm border border-indigo-800/30 text-[0.6rem] font-light tracking-wider text-indigo-300 mb-4">
                <Sparkles className="h-2.5 w-2.5 mr-1.5" />
                NETWORK OVERVIEW
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">
                Network Dashboard
              </h1>
              <p className="text-sm text-gray-400 font-light tracking-wide">
                Overview and management of your charging infrastructure
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link
                to="/map"
                className="inline-flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-light tracking-wide text-gray-300 transition-all duration-200"
              >
                <MapPin className="h-4 w-4 mr-2" />
                View Map
              </Link>
              <Link
                to="/home"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-light tracking-wide text-white transition-all duration-200"
              >
                <Activity className="h-4 w-4 mr-2" />
                All Stations
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Stations */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-lg rounded-xl border border-indigo-800/30 p-6 hover:border-indigo-600/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center border border-indigo-800/30 group-hover:border-indigo-600/50 transition-colors">
                <Zap className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="text-right">
                <div className="text-xs text-indigo-300 font-light tracking-wider">+12%</div>
                <div className="text-xs text-gray-500">vs last month</div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-light tracking-wider uppercase mb-1">
                Total Stations
              </p>
              <p className="text-3xl font-light text-white mb-1">
                {stats.totalStations}
              </p>
              <p className="text-xs text-gray-500 font-light">
                Across your network
              </p>
            </div>
          </div>

          {/* Active Stations */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg rounded-xl border border-green-800/30 p-6 hover:border-green-600/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center border border-green-800/30 group-hover:border-green-600/50 transition-colors">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-xs text-green-300 font-light tracking-wider">+5%</div>
                <div className="text-xs text-gray-500">vs last week</div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-light tracking-wider uppercase mb-1">
                Active Stations
              </p>
              <p className="text-3xl font-light text-white mb-1">
                {stats.activeStations}
              </p>
              <p className="text-xs text-gray-500 font-light">
                Ready for charging
              </p>
            </div>
          </div>

          {/* Total Power */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-lg rounded-xl border border-blue-800/30 p-6 hover:border-blue-600/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center border border-blue-800/30 group-hover:border-blue-600/50 transition-colors">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-300 font-light tracking-wider">+8%</div>
                <div className="text-xs text-gray-500">vs last month</div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-light tracking-wider uppercase mb-1">
                Total Power
              </p>
              <p className="text-3xl font-light text-white mb-1">
                {stats.totalPower.toFixed(0)} kW
              </p>
              <p className="text-xs text-gray-500 font-light">
                Combined capacity
              </p>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-lg rounded-xl border border-yellow-800/30 p-6 hover:border-yellow-600/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-900/50 rounded-lg flex items-center justify-center border border-yellow-800/30 group-hover:border-yellow-600/50 transition-colors">
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="text-right">
                <div className="text-xs text-yellow-300 font-light tracking-wider">+0.2</div>
                <div className="text-xs text-gray-500">vs last week</div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-light tracking-wider uppercase mb-1">
                Avg Rating
              </p>
              <p className="text-3xl font-light text-white mb-1">
                {stats.avgRating.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500 font-light">
                Customer satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Charging Stations Management */}
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 overflow-hidden">
          <ChargingStations stations={stations} setStations={setStations} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
