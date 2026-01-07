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
  const itemsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    connectorType: "",
  });

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const matchesSearch =
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filters.status || station.status === filters.status;
      const matchesConnector =
        !filters.connectorType || station.connectorType === filters.connectorType;

      return matchesSearch && matchesStatus && matchesConnector;
    });
  }, [stations, searchTerm, filters]);

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
    const totalPages = Math.ceil(filteredStations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredStations.slice(startIndex, startIndex + itemsPerPage);
    return { totalPages, currentItems };
  }, [filteredStations, currentPage, itemsPerPage]);

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
              Network Management
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Your <span className="text-slate-500 opacity-40">Dashboard.</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 animate-fade-in">
            <button
              onClick={handleShowAddForm}
              className="btn-primary flex items-center gap-2 !rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest"
            >
              <Plus size={16} />
              Add Station
            </button>
            <Link to="/map" className="btn-secondary flex items-center gap-2 !rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest">
              <MapPin size={16} />
              Map View
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 animate-fade-in">
          <StatCard
            icon={<Zap size={16} className="text-brand-primary" />}
            value={stats.totalStations}
            label="Total Stations"
            description="Across your network"
          />
          <StatCard
            icon={<CheckCircle size={16} className="text-emerald-500" />}
            value={stats.activeStations}
            label="Active Now"
            description="Ready for charging"
          />
          <StatCard
            icon={<Battery size={16} className="text-purple-500" />}
            value={`${Math.round(stats.totalPower)} kW`}
            label="Total Capacity"
            description="Combined power"
          />
          <StatCard
            icon={<Star size={16} className="text-brand-primary" />}
            value={stats.avgRating.toFixed(1)}
            label="Avg Rating"
            description="Network performance"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel overflow-hidden border-white/5">
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight text-white">Your Stations</h2>
                <Link to="/stations" className="text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white flex items-center gap-2 transition-colors">
                  View all <ArrowRight size={12} />
                </Link>
              </div>
              <ChargingStations
                stations={paginatedData.currentItems}
                setStations={setStations}
                onEdit={handleEdit}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
              />
              <div className="p-6 border-t border-white/5">
                <Pagination
                  currentPage={currentPage}
                  totalPages={paginatedData.totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-6 border-white/5">
              <RecentlyViewed />
            </div>

            <div className="glass-panel p-6 bg-brand-primary/[0.02] border-brand-primary/10">
              <h3 className="text-[10px] font-bold text-white mb-2 uppercase tracking-widest">Need help?</h3>
              <p className="text-[11px] text-slate-500 mb-5 leading-relaxed font-medium">
                Manage your charging infrastructure with ease. Add new stations, update existing ones, or monitor performance.
              </p>
              <button className="text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors flex items-center gap-2">
                Read documentation <ArrowRight size={10} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Station Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-midnight/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg glass-panel p-8 animate-slide-up border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingStation ? "Edit Station" : "Add New Station"}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white transition-colors">
                <Plus className="rotate-45" size={20} />
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
  <div className="glass-panel p-5 flex flex-col gap-3 hover:bg-white/[0.04] transition-all duration-300 border-white/5">
    <div className="p-2 rounded-lg bg-white/5 w-fit">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-white mb-0.5">
        {value}
      </p>
      <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  </div>
);

export default Dashboard;
