import React from "react";
import { MapPin, Zap, Star, Heart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const StationCard = ({ station, viewMode, handleSaveStation, isStationSaved }) => {
  const isGrid = viewMode === "grid";

  const reviews = station.reviews || [];

  return (
    <div className={`glass-panel group hover:bg-white/[0.03] transition-all duration-500 border-white/5 hover:border-brand-primary/20 ${isGrid ? "p-5" : "p-4"}`}>
      <div className={`${isGrid ? "flex flex-col" : "flex items-center justify-between gap-6"}`}>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-white mb-1 group-hover:text-brand-primary transition-colors tracking-tight">
                {station.name}
              </h3>
              <div className="flex items-center text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                <MapPin size={12} className="mr-1.5 text-brand-primary" />
                {station.location}
              </div>
            </div>

            <button
              onClick={() => handleSaveStation(station._id)}
              className={`p-2 rounded-xl transition-all duration-300 ${isStationSaved ? "bg-red-500/10 text-red-500" : "bg-white/5 text-slate-500 hover:text-white"
                }`}
            >
              <Heart size={14} fill={isStationSaved ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-400">
              <Zap size={10} className="text-brand-primary" />
              {station.powerOutput} kW
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-400">
              <span className="text-slate-500">{station.connectorType}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${station.status === "Active"
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
              }`}>
              <span className={`w-1 h-1 rounded-full ${station.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`} />
              {station.status}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Star size={12} className="text-brand-primary fill-brand-primary" />
                <span className="text-xs font-bold text-white">
                  {station.averageRating ? station.averageRating.toFixed(1) : "0.0"}
                </span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {reviews?.length || 0} reviews
              </span>
            </div>

            <Link
              to={`/station/${station._id}`}
              className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors group/link"
            >
              Details
              <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationCard;
