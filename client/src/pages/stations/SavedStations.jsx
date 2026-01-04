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
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/fallback/LoadingSpinner";

function SavedStations() {
  const [savedStations, setSavedStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUser } = useAuth();

  const fetchSavedStations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/station/saved-stations");
      if (response.status === 200) {
        setSavedStations(response.data.savedStations);
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
      toast.error("Error removing station");
    }
  };

  useEffect(() => {
    fetchSavedStations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center p-6">
        <div className="glass-panel p-8 max-w-md w-full text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Error Loading Stations</h3>
          <p className="text-reflect-muted mb-6">{error || "Failed to load your saved stations"}</p>
          <button onClick={() => window.location.reload()} className="btn-primary w-full">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight text-white pt-40 pb-32 px-8 relative overflow-hidden">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 bg-aurora pointer-events-none opacity-30" />

      <main className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="animate-slide-up">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-reflect-muted mb-6 uppercase tracking-[0.2em]">
              <Sparkles className="h-3 w-3 mr-2 text-blue-500" />
              Your Collection
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Saved <span className="text-reflect-muted opacity-40">Stations.</span>
            </h1>
          </div>

          <Link
            to="/stations"
            className="btn-secondary flex items-center gap-3 !rounded-full px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest animate-fade-in"
          >
            <MapIcon size={18} />
            Explore More
          </Link>
        </div>

        {savedStations.length === 0 ? (
          <div className="glass-panel p-24 text-center animate-fade-in border-white/5">
            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-2xl">
              <Heart className="h-10 w-10 text-reflect-muted opacity-20" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">No saved stations yet</h3>
            <p className="text-reflect-muted mb-12 max-w-sm mx-auto font-medium leading-relaxed">
              Browse our global network and save your favorite charging locations for quick access.
            </p>
            <Link to="/stations" className="btn-primary inline-flex items-center gap-3 !rounded-full px-10 py-4 text-[15px] font-bold uppercase tracking-widest">
              Explore network
              <ChevronRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {savedStations.map((station) => (
              <div
                key={station._id}
                className="glass-panel p-8 group hover:bg-white/[0.04] transition-all duration-500 border-white/5"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-start gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-2xl ${station.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}>
                      <Zap size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                        {station.name}
                      </h3>
                      <div className="flex items-center text-sm text-reflect-muted mt-2 font-medium">
                        <MapPin size={14} className="mr-2 text-blue-500" />
                        {station.location}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUnsaveStation(station._id)}
                    className="p-3 bg-red-500/5 text-red-500/40 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                    title="Remove from saved"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${station.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}>
                      {station.status}
                    </span>
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/5 text-reflect-muted border border-white/10">
                      {station.powerOutput} kW
                    </span>
                  </div>

                  <Link
                    to={`/station/${station._id}`}
                    className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors group/link"
                  >
                    Details
                    <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SavedStations;
