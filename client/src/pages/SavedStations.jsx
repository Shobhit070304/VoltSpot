import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";
import { MapPin, Zap, Heart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SavedStations() {
  const [savedStations, setSavedStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuth();

  const fetchSavedStations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/station/saved-stations");

      if (response.status === 200) {
        setSavedStations(response.data.savedStations);
      } else {
        setError("Failed to fetch saved stations");
        toast.error("Failed to fetch saved stations");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Error fetching saved stations");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsaveStation = async (stationId) => {
    try {
      const response = await api.post(`/station/save/${stationId}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        setSavedStations(
          savedStations.filter((station) => station._id !== stationId)
        );
        setUser((prev) => ({
          ...prev,
          savedStations: response.data.savedStations,
        }));
      }
    } catch (error) {
      toast.error("Error removing station from saved list");
    }
  };

  useEffect(() => {
    fetchSavedStations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center pt-20">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-700 border-t-indigo-500 mb-3"></div>
          <p className="text-xs text-gray-500 font-light tracking-wide">
            Loading your stations...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center pt-20">
        <div className="bg-red-900/30 backdrop-blur-lg rounded-xl border border-red-800/50 p-6 max-w-md mx-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-200 mb-1">
                Error Loading Stations
              </h3>
              <p className="text-xs text-red-300 font-light tracking-wide leading-relaxed">
                {error.message || "Failed to load your saved stations"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center px-3 py-1.5 text-xs font-light tracking-wide rounded-lg border border-red-800/50 text-red-300 bg-red-900/20 hover:bg-red-900/30 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black pt-20">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[15%] left-[20%] w-[40rem] h-[40rem] bg-indigo-900/10 rounded-full blur-[120px] opacity-20 animate-float"></div>
        <div className="absolute bottom-[20%] right-[25%] w-[35rem] h-[35rem] bg-cyan-900/10 rounded-full blur-[100px] opacity-15 animate-float-delay"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-light text-gray-100 mb-1 tracking-tight">
            Saved Stations
          </h1>
          <p className="text-xs text-gray-500 font-light tracking-wide">
            Your favorite charging locations
          </p>
        </div>

        {savedStations.length === 0 ? (
          /* Empty State */
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 p-8 text-center shadow-xl">
            <div className="w-14 h-14 bg-gray-800/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-700/50">
              <Heart className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-base font-light text-gray-200 mb-2">
              No saved stations yet
            </h3>
            <p className="text-xs text-gray-400 mb-6 max-w-md mx-auto font-light tracking-wide leading-relaxed">
              You haven't saved any stations. Browse our network and save your
              favorites for quick access.
            </p>
            <Link
              to="/home"
              className="inline-flex items-center px-4 py-2.5 border border-transparent text-xs font-light tracking-wide rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Explore Stations
            </Link>
          </div>
        ) : (
          /* Stations Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {savedStations.map((station) => (
              <div
                key={station._id}
                className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 p-5 hover:bg-gray-800/50 transition-colors shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                        station.status === "Active"
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-light text-white mb-1.5">
                        {station.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-400 mb-1 font-light tracking-wide">
                        <MapPin className="h-3 w-3 mr-1.5 text-gray-500" />
                        {station.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-400 font-light tracking-wide">
                        <Zap className="h-3 w-3 mr-1.5 text-gray-500" />
                        {station.powerOutput} kW • {station.connectorType}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUnsaveStation(station._id)}
                    className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label="Remove from saved stations"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                  <span
                    className={`px-2.5 py-1 text-xs font-light tracking-wide rounded-full ${
                      station.status === "Active"
                        ? "bg-green-500/10 text-green-400 border border-green-500/30"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {station.status}
                  </span>

                  <Link
                    to={`/station/${station._id}`}
                    className="inline-flex items-center text-xs font-light tracking-wide text-gray-300 hover:text-white transition-colors"
                  >
                    View details
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedStations;
