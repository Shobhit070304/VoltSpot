import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../services/api";
import {
  MapPin,
  Zap,
  Heart,
  ChevronRight,
  Map as MapIcon,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
          savedStations.filter((station) => station._id !== stationId),
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 flex items-center justify-center pt-20">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-200 border-t-orange-500 mb-3"></div>
          <p className="text-xs text-orange-600 font-medium tracking-wide">
            Loading your stations...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 flex items-center justify-center pt-20">
        <div className="bg-white/90 rounded-2xl border border-orange-200 p-6 max-w-md mx-4 shadow-md">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Error Loading Stations
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {error.message || "Failed to load your saved stations"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 text-xs font-medium tracking-wide rounded-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 pt-20 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
        <div className="absolute top-[50%] left-[50%] w-[18rem] h-[18rem] bg-yellow-200/20 rounded-full blur-[60px] opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Saved Stations
                </span>
              </h1>
              <p className="text-sm text-gray-600">
                Your favorite charging locations
              </p>
            </div>
            <Link
              to="/stations"
              className="inline-flex items-center px-4 py-2 border border-orange-200 text-xs font-medium tracking-wide rounded-lg text-orange-700 bg-white hover:bg-orange-50 transition-all"
            >
              <MapIcon className="mr-2 h-4 w-4" />
              Explore More
            </Link>
          </div>
        </div>

        {savedStations.length === 0 ? (
          /* Empty State */
          <div className="bg-white/90 rounded-2xl border border-orange-100 p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No saved stations yet
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              You haven't saved any stations. Browse our network and save your
              favorites for quick access.
            </p>
            <Link
              to="/stations"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium tracking-wide rounded-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm"
            >
              Explore Stations
            </Link>
          </div>
        ) : (
          /* Stations Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {savedStations.map((station) => (
              <div
                key={station._id}
                className="bg-white/90 rounded-xl border border-orange-100 p-5 hover:bg-orange-50 transition-colors shadow-sm group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        station.status === "Active"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      }`}
                    >
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-orange-600 transition-colors">
                        {station.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mb-1 font-medium">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-orange-400" />
                        {station.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 font-medium">
                        <Zap className="h-3.5 w-3.5 mr-2 text-orange-400" />
                        {station.powerOutput} kW • {station.connectorType}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUnsaveStation(station._id)}
                    className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                    aria-label="Remove from saved stations"
                  >
                    <Heart className="h-5 w-5 text-red-400 fill-current" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-orange-100">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      station.status === "Active"
                        ? "bg-green-500/20 text-green-500 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                    }`}
                  >
                    {station.status}
                  </span>

                  <Link
                    to={`/station/${station._id}`}
                    className="inline-flex items-center text-xs font-medium tracking-wide text-orange-700 hover:text-orange-900 transition-colors"
                  >
                    View details
                    <ChevronRight className="ml-1 h-4 w-4" />
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
