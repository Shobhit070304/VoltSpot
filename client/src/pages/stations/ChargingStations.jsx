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
  "Universal"
];

const ChargingStations = ({
  stations,
  setStations,
  onEdit,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters
}) => {
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

  // Stations are already filtered by parent component
  const filteredStations = stations;

  return (
    <div className="flex flex-col">
      {/* Search and filters */}
      <div className="p-6 border-b border-white/5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text"
              placeholder="Search your stations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all font-medium"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center justify-center gap-2 !py-2 !px-4"
          >
            <Filter size={14} />
            <span className="text-[11px] font-bold uppercase tracking-widest">Filters</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-[13px] text-white focus:outline-none focus:border-brand-primary transition-colors font-medium"
              >
                <option value="" className="bg-midnight">All Statuses</option>
                <option value="Active" className="bg-midnight">Active</option>
                <option value="Inactive" className="bg-midnight">Inactive</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Connector
              </label>
              <select
                value={filters.connectorType}
                onChange={(e) => setFilters({ ...filters, connectorType: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-[13px] text-white focus:outline-none focus:border-brand-primary transition-colors font-medium"
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
              <div className="px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${station.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}>
                      <Zap size={16} />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-bold text-white group-hover:text-brand-primary transition-colors tracking-tight">
                        {station.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {station.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(station)}
                      className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      title="Edit station"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteStation(station._id)}
                      className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete station"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="w-px h-3 bg-white/10 mx-1" />
                    <Link
                      to={`/station/${station._id}`}
                      className="p-2 text-slate-500 hover:text-brand-primary transition-all"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2.5">
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full border ${station.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                    {station.status}
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full bg-white/5 text-slate-500 border border-white/10">
                    {station.powerOutput} kW
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full bg-white/5 text-slate-500 border border-white/10">
                    {station.connectorType}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-16 text-center">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/10">
            <Zap size={16} className="text-slate-600" />
          </div>
          <h3 className="text-[13px] font-bold text-white mb-1">No stations found</h3>
          <p className="text-[11px] text-slate-500 font-medium">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ChargingStations;
