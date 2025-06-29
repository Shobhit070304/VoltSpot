import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Zap, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import ChargingStations from "./ChargingStations";
import toast from "react-hot-toast";

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
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">
            Network Dashboard
          </h1>
          <p className="text-sm text-gray-400 font-light tracking-wide">
            Overview and management of your charging infrastructure
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Total Stations */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 p-5 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mr-4 border border-indigo-500/20">
                <Zap className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-light tracking-wider uppercase mb-1">
                  Total Stations
                </p>
                <p className="text-2xl font-light text-white">
                  {stats.totalStations}
                </p>
              </div>
            </div>
          </div>

          {/* Active Stations */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 p-5 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4 border border-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-light tracking-wider uppercase mb-1">
                  Active
                </p>
                <p className="text-2xl font-light text-white">
                  {stats.activeStations}
                </p>
              </div>
            </div>
          </div>

          {/* Inactive Stations */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 p-5 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4 border border-yellow-500/20">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-light tracking-wider uppercase mb-1">
                  Inactive
                </p>
                <p className="text-2xl font-light text-white">
                  {stats.inactiveStations}
                </p>
              </div>
            </div>
          </div>

          {/* Avg Power Output */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 p-5 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 border border-blue-500/20">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-light tracking-wider uppercase mb-1">
                  Avg. Power
                </p>
                <p className="text-2xl font-light text-white">
                  {stats.avgPowerOutput.toFixed(1)} kW
                </p>
              </div>
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
