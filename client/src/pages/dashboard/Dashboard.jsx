import { useState, useEffect, useMemo } from "react";
import { api } from "../../services/api";
import {
  Zap,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Activity,
  Star,
  Sparkles,
  Battery,
  Plus,
  ArrowRight,
} from "lucide-react";
import ChargingStations from "../stations/ChargingStations";
import StationForm from "../../components/forms/StationForm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import RecentlyViewed from "../../components/widgets/RecentlyViewed";
import Pagination from "../../components/Home/Pagination";
import LoadingSpinner from "../../components/fallback/LoadingSpinner";

const Dashboard = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stats = useMemo(() => {
    return {
      totalStations: stations.length,
      activeStations: stations.filter((station) => station.status === "Active").length,
      totalPower: stations.reduce((sum, station) => sum + (station.powerOutput || 0), 0),
      avgRating: stations.length > 0
        ? stations.reduce((sum, station) => sum + (station.averageRating || 0), 0) / stations.length
        : 0,
    };
  }, [stations]);

  const paginatedData = useMemo(() => {
    const totalPages = Math.ceil(stations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = stations.slice(startIndex, startIndex + itemsPerPage);
    return { totalPages, currentItems };
  }, [stations, currentPage, itemsPerPage]);

  const fetchStations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/station/me");

      if (response.status === 200) {
        const stationsData = response.data.stations || [];
        setStations(stationsData);
      }
    } catch (error) {
      setError(error);
      toast.error(error.message || "Error fetching stations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleAddStation = async (stationData) => {
    try {
      const response = await api.post("/station/create", stationData);
      if (response.status === 200) {
        toast.success("Station created successfully");
        const newStation = response.data.station;
        if (newStation) {
          setStations(prev => [newStation, ...prev]);
        } else {
          fetchStations();
        }
        setShowForm(false);
      }
    } catch (err) {
      // Error is already handled by interceptor or can be handled here if specific
    }
  };

  const handleUpdateStation = async (id, stationData) => {
    try {
      const response = await api.put(`/station/update/${id}`, stationData);
      if (response.status === 200) {
        toast.success("Station updated successfully");
        const updatedStation = response.data.station;
        if (updatedStation) {
          setStations(prev => prev.map(s => s._id === id ? updatedStation : s));
        } else {
          fetchStations();
        }
        setEditingStation(null);
        setShowForm(false);
      }
    } catch (err) {
      // Error handled by interceptor
    }
  };

  const handleEdit = (station) => {
    setEditingStation(station);
    setShowForm(true);
  };

  const handleShowAddForm = () => {
    setEditingStation(null);
    setShowForm(true);
  };

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
          <h3 className="text-xl font-bold text-white mb-2">Error Loading Dashboard</h3>
          <p className="text-reflect-muted mb-6">{error.message || "Failed to fetch dashboard data."}</p>
          <button onClick={fetchStations} className="btn-primary w-full">
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

      <main className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="animate-slide-up">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-reflect-muted mb-6 uppercase tracking-[0.2em]">
              <Sparkles className="h-3 w-3 mr-2 text-blue-500" />
              Network Management
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Your <span className="text-reflect-muted opacity-40">Dashboard.</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in">
            <button
              onClick={handleShowAddForm}
              className="btn-primary flex items-center gap-3 !rounded-full px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest"
            >
              <Plus size={18} />
              Add Station
            </button>
            <Link to="/map" className="btn-secondary flex items-center gap-3 !rounded-full px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest">
              <MapPin size={18} />
              Map View
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-fade-in">
          <StatCard
            icon={<Zap size={20} className="text-blue-500" />}
            value={stats.totalStations}
            label="Total Stations"
            description="Across your network"
          />
          <StatCard
            icon={<CheckCircle size={20} className="text-emerald-500" />}
            value={stats.activeStations}
            label="Active Now"
            description="Ready for charging"
          />
          <StatCard
            icon={<Battery size={20} className="text-purple-500" />}
            value={`${Math.round(stats.totalPower)} kW`}
            label="Total Capacity"
            description="Combined power"
          />
          <StatCard
            icon={<Star size={20} className="text-blue-500" />}
            value={stats.avgRating.toFixed(1)}
            label="Avg Rating"
            description="Network performance"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            <div className="glass-panel overflow-hidden border-white/5">
              <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-white">Your Stations</h2>
                <Link to="/stations" className="text-[11px] font-bold uppercase tracking-widest text-reflect-muted hover:text-white flex items-center gap-2 transition-colors">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <ChargingStations
                stations={paginatedData.currentItems}
                setStations={setStations}
                onEdit={handleEdit}
              />
              <div className="p-8 border-t border-white/5">
                <Pagination
                  currentPage={currentPage}
                  totalPages={paginatedData.totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-12">
            <div className="glass-panel p-8 border-white/5">
              <RecentlyViewed />
            </div>

            <div className="glass-panel p-8 bg-reflect-gradient/5 border-blue-500/20">
              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-widest">Need help?</h3>
              <p className="text-xs text-reflect-muted mb-6 leading-relaxed font-medium">
                Manage your charging infrastructure with ease. Add new stations, update existing ones, or monitor performance.
              </p>
              <button className="text-[11px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                Read documentation <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Station Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-midnight/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg glass-panel p-8 animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">
                {editingStation ? "Edit Station" : "Add New Station"}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-reflect-muted hover:text-white transition-colors">
                <Plus className="rotate-45" size={24} />
              </button>
            </div>
            <StationForm
              initialData={editingStation}
              onSubmit={(data) => {
                if (editingStation) {
                  handleUpdateStation(editingStation._id, data);
                } else {
                  handleAddStation(data);
                }
              }}
              onCancel={() => {
                setEditingStation(null);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, value, label, description }) => (
  <div className="glass-panel p-6 flex flex-col gap-3 hover:bg-white/[0.04] transition-all duration-300">
    <div className="p-2 rounded-lg bg-white/5 w-fit">
      {icon}
    </div>
    <div>
      <p className="text-xs font-medium text-reflect-muted uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-white mb-1">
        {value}
      </p>
      <p className="text-[10px] text-reflect-muted leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default Dashboard;
