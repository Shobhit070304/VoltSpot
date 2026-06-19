import { useState, useEffect, useMemo, useCallback } from "react";
import useWebSocket from "../../hooks/useWebSocket";
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

  // WebSocket real-time updates — handled by useWebSocket hook
  const handleWsMessage = useCallback((message) => {
    if (message.type === "station-updated") {
      const updated = message.data;
      setStations((prev) => {
        // Only update if it already exists in our list (dashboard shows MY stations)
        if (prev.some((s) => s._id === updated._id)) {
          return prev.map((s) => (s._id === updated._id ? { ...s, ...updated } : s));
        }
        return prev;
      });
    } else if (message.type === "station-deleted") {
      const deletedId = message.data._id;
      setStations((prev) => prev.filter((s) => s._id !== deletedId));
    }
  }, []);

  useWebSocket(handleWsMessage);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    connectorType: "",
  });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Debounce filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const matchesSearch =
        station.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        station.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesStatus = !debouncedFilters.status || station.status === debouncedFilters.status;
      const matchesConnector =
        !debouncedFilters.connectorType || station.connectorType === debouncedFilters.connectorType;

      return matchesSearch && matchesStatus && matchesConnector;
    });
  }, [stations, debouncedSearchTerm, debouncedFilters]);

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

  const statusCounts = useMemo(() => {
    const counts = { Active: 0, Maintenance: 0, Inactive: 0 };
    stations.forEach((s) => {
      if (counts[s.status] !== undefined) {
        counts[s.status]++;
      }
    });
    return counts;
  }, [stations]);

  const connectorCounts = useMemo(() => {
    const counts = {};
    stations.forEach((s) => {
      if (s.connectorType) {
        counts[s.connectorType] = (counts[s.connectorType] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4); // Top 4
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
      const response = await api.get("/stations/me");

      if (response.status === 200) {
        const stationsData = response.data.data.stations || [];
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
      const response = await api.post("/stations", stationData);
      if (response.status === 201) {
        toast.success("Station created successfully");
        const newStation = response.data.data.station;
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
      const response = await api.put(`/stations/${id}`, stationData);
      if (response.status === 200) {
        toast.success("Station updated successfully");
        const updatedStation = response.data.data.station;
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

        {/* Visual Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 animate-fade-in">
          {/* Status Distribution Donut Chart */}
          <div className="glass-panel p-6 border-white/5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold text-slate-500 mb-3 uppercase tracking-widest">
                Real-Time
              </div>
              <h3 className="text-sm font-bold text-white mb-6 tracking-tight uppercase">
                Status Distribution
              </h3>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative w-36 h-36 flex-shrink-0">
                <svg viewBox="0 0 160 160" width="100%" height="100%">
                  <circle cx="80" cy="80" r="50" fill="transparent" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="12" />
                  {stats.totalStations > 0 ? (
                    <>
                      {/* Active segment (emerald-500) */}
                      {((statusCounts.Active / stats.totalStations) * 314.16) > 0 && (
                        <circle
                          cx="80"
                          cy="80"
                          r="50"
                          fill="transparent"
                          stroke="#10b981"
                          strokeWidth="12"
                          strokeDasharray={`${(statusCounts.Active / stats.totalStations) * 314.16} 314.16`}
                          strokeDashoffset={0}
                          strokeLinecap="round"
                          transform="rotate(-90 80 80)"
                          className="transition-all duration-1000 ease-out"
                        />
                      )}
                      {/* Maintenance segment (amber-500) */}
                      {((statusCounts.Maintenance / stats.totalStations) * 314.16) > 0 && (
                        <circle
                          cx="80"
                          cy="80"
                          r="50"
                          fill="transparent"
                          stroke="#f59e0b"
                          strokeWidth="12"
                          strokeDasharray={`${(statusCounts.Maintenance / stats.totalStations) * 314.16} 314.16`}
                          strokeDashoffset={-((statusCounts.Active / stats.totalStations) * 314.16)}
                          strokeLinecap="round"
                          transform="rotate(-90 80 80)"
                          className="transition-all duration-1000 ease-out"
                        />
                      )}
                      {/* Inactive segment (red-500) */}
                      {((statusCounts.Inactive / stats.totalStations) * 314.16) > 0 && (
                        <circle
                          cx="80"
                          cy="80"
                          r="50"
                          fill="transparent"
                          stroke="#ef4444"
                          strokeWidth="12"
                          strokeDasharray={`${(statusCounts.Inactive / stats.totalStations) * 314.16} 314.16`}
                          strokeDashoffset={-(((statusCounts.Active + statusCounts.Maintenance) / stats.totalStations) * 314.16)}
                          strokeLinecap="round"
                          transform="rotate(-90 80 80)"
                          className="transition-all duration-1000 ease-out"
                        />
                      )}
                    </>
                  ) : (
                    <circle cx="80" cy="80" r="50" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                  )}
                  {/* Inner text */}
                  <text x="80" y="76" textAnchor="middle" fill="#ffffff" className="text-xl font-bold font-sans">
                    {stats.totalStations}
                  </text>
                  <text x="80" y="94" textAnchor="middle" fill="#64748b" className="text-[9px] font-bold uppercase tracking-widest font-sans">
                    Stations
                  </text>
                </svg>
              </div>

              <div className="flex-1 grid grid-cols-1 gap-2.5 w-full">
                <LegendItem
                  color="bg-emerald-500"
                  label="Active"
                  count={statusCounts.Active}
                  pct={stats.totalStations > 0 ? statusCounts.Active / stats.totalStations : 0}
                />
                <LegendItem
                  color="bg-amber-500"
                  label="Maintenance"
                  count={statusCounts.Maintenance}
                  pct={stats.totalStations > 0 ? statusCounts.Maintenance / stats.totalStations : 0}
                />
                <LegendItem
                  color="bg-red-500"
                  label="Inactive"
                  count={statusCounts.Inactive}
                  pct={stats.totalStations > 0 ? statusCounts.Inactive / stats.totalStations : 0}
                />
              </div>
            </div>
          </div>

          {/* Connector Popularity Bar Chart */}
          <div className="glass-panel p-6 border-white/5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold text-slate-500 mb-3 uppercase tracking-widest">
                Capabilities
              </div>
              <h3 className="text-sm font-bold text-white mb-6 tracking-tight uppercase">
                Connector Type Breakdown
              </h3>
            </div>

            <div className="w-full">
              {connectorCounts.length > 0 ? (
                <svg viewBox="0 0 350 160" width="100%" height="100%">
                  <defs>
                    <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  {connectorCounts.map(([type, count], idx) => {
                    const y = idx * 36 + 15;
                    const maxCount = Math.max(...connectorCounts.map(c => c[1]), 1);
                    const barWidth = (count / maxCount) * 200;
                    return (
                      <g key={type}>
                        {/* Label */}
                        <text
                          x="10"
                          y={y + 6}
                          fill="#94a3b8"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="start"
                          dominantBaseline="middle"
                          className="font-sans uppercase tracking-wider"
                        >
                          {type}
                        </text>
                        {/* Track */}
                        <rect
                          x="90"
                          y={y}
                          width="200"
                          height="12"
                          rx="6"
                          fill="rgba(255,255,255,0.02)"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="1"
                        />
                        {/* Fill */}
                        <rect
                          x="90"
                          y={y}
                          width={barWidth}
                          height="12"
                          rx="6"
                          fill="url(#barGradient)"
                          className="transition-all duration-1000 ease-out"
                        />
                        {/* Count */}
                        <text
                          x="305"
                          y={y + 6}
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="start"
                          dominantBaseline="middle"
                          className="font-sans"
                        >
                          {count}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <div className="h-40 flex items-center justify-center text-xs text-slate-500 font-medium">
                  No connector data available
                </div>
              )}
            </div>
          </div>
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

const LegendItem = ({ color, label, count, pct }) => (
  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-300">
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-[13px] font-medium text-slate-400">{label}</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-[13px] font-bold text-white">{count}</span>
      <span className="text-[10px] font-bold text-slate-500">({(pct * 100).toFixed(0)}%)</span>
    </div>
  </div>
);

export default Dashboard;
