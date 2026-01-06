import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  ChevronDown,
  Edit,
  Trash2,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const connectorTypes = [
  "Type 1",
  "Type 2",
  "CCS",
  "CHAdeMO",
  "CCS/CHAdeMO",
  "Tesla",
];

const ChargingStations = ({ stations, setStations, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    connectorType: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleDeleteStation = async (id) => {
    if (!confirm("Are you sure you want to delete this charging station?")) {
      return;
    }

    try {
      const response = await api.delete(`/station/delete/${id}`);
      if (response.status === 200) {
        toast.success("Station deleted successfully");
        setStations((prevStations) => prevStations.filter((station) => station._id !== id));
      }
    } catch (err) {
      toast.error("Failed to delete station");
    }
  };

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || station.status === filters.status;
    const matchesConnector =
      !filters.connectorType || station.connectorType === filters.connectorType;

    return matchesSearch && matchesStatus && matchesConnector;
  });

  return (
    <div className="flex flex-col">
      {/* Search and filters */}
      <div className="p-6 border-b border-white/5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-reflect-muted group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search your stations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-reflect-muted/50 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center justify-center gap-2 !py-2.5"
          >
            <Filter size={16} />
            <span className="text-sm">Filters</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
            <div className="space-y-2">
              <label className="text-[10px] font-medium text-reflect-muted uppercase tracking-wider">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="" className="bg-midnight">All Statuses</option>
                <option value="Active" className="bg-midnight">Active</option>
                <option value="Inactive" className="bg-midnight">Inactive</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-medium text-reflect-muted uppercase tracking-wider">
                Connector
              </label>
              <select
                value={filters.connectorType}
                onChange={(e) => setFilters({ ...filters, connectorType: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="" className="bg-midnight">All Types</option>
                {connectorTypes.map((type) => (
                  <option key={type} value={type} className="bg-midnight">{type}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Station list */}
      {filteredStations.length > 0 ? (
        <ul className="divide-y divide-white/5">
          {filteredStations.map((station) => (
            <li key={station._id} className="group hover:bg-white/[0.02] transition-colors">
              <div className="px-8 py-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${station.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}>
                      <Zap size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {station.name}
                      </h3>
                      <p className="text-xs text-reflect-muted mt-0.5">
                        {station.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(station)}
                      className="p-2 text-reflect-muted hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      title="Edit station"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteStation(station._id)}
                      className="p-2 text-reflect-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete station"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-2" />
                    <Link
                      to={`/station/${station._id}`}
                      className="p-2 text-reflect-muted hover:text-blue-400 transition-all"
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${station.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                    {station.status}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-reflect-muted border border-white/10">
                    {station.powerOutput} kW
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-reflect-muted border border-white/10">
                    {station.connectorType}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-20 text-center">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
            <Zap size={20} className="text-reflect-muted" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No stations found</h3>
          <p className="text-xs text-reflect-muted">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ChargingStations;
