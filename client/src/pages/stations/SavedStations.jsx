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
    <div className="min-h-screen bg-midnight text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 animate-move-grid" />
      <div className="absolute inset-0 grid-dots opacity-40 animate-move-grid [animation-duration:10s]" />

      {/* Aurora Background Effect */}
      <div className="fixed inset-0 bg-aurora pointer-events-none opacity-20" />

      <main className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="animate-slide-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-slate-500 mb-5 uppercase tracking-[0.2em]">
              <Sparkles className="h-2.5 w-2.5 mr-2 text-brand-primary" />
              Your Collection
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Saved <span className="text-slate-500 opacity-40">Stations.</span>
            </h1>
          </div>

          <Link
            to="/stations"
            className="btn-secondary flex items-center gap-2 !rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest animate-fade-in"
          >
            <MapIcon size={16} />
            Explore More
          </Link>
        </div>

        {savedStations.length === 0 ? (
          <div className="glass-panel p-16 text-center animate-fade-in border-white/5">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-2xl">
              <Heart className="h-8 w-8 text-slate-500 opacity-20" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">No saved stations yet</h3>
            <p className="text-[13px] text-slate-500 mb-10 max-w-xs mx-auto font-medium leading-relaxed">
              Browse our global network and save your favorite charging locations for quick access.
            </p>
            <Link to="/stations" className="btn-primary inline-flex items-center gap-2 !rounded-full px-8 py-3 text-[13px] font-bold uppercase tracking-widest">
              Explore network
              <ChevronRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {savedStations.map((station) => (
              <div
                key={station._id}
                className="glass-panel p-6 group hover:bg-white/[0.04] transition-all duration-500 border-white/5"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-2xl ${station.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}>
                      <Zap size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors tracking-tight">
                        {station.name}
                      </h3>
                      <div className="flex items-center text-[11px] text-slate-500 mt-1.5 font-medium">
                        <MapPin size={12} className="mr-1.5 text-brand-primary" />
                        {station.location}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUnsaveStation(station._id)}
                    className="p-2.5 bg-red-500/5 text-red-500/40 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                    title="Remove from saved"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full border ${station.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}>
                      {station.status}
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full bg-white/5 text-slate-500 border border-white/10">
                      {station.powerOutput} kW
                    </span>
                  </div>

                  <Link
                    to={`/station/${station._id}`}
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors group/link"
                  >
                    Details
                    <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
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
