import React from "react";
import { Zap, Activity, Cpu, Globe } from "lucide-react";

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      label: "Total Stations",
      value: stats.total,
      icon: <Globe size={18} />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Active Now",
      value: stats.active,
      icon: <Activity size={18} />,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Avg. Power",
      value: `${stats.avgPower} kW`,
      icon: <Zap size={18} />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      label: "Connectors",
      value: stats.connectors,
      icon: <Cpu size={18} />,
      color: "text-violet-400",
      bg: "bg-violet-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, i) => (
        <div key={i} className="glass-panel p-5 border-white/5 group hover:border-brand-primary/20 transition-all duration-500 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} blur-[40px] -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className={`p-2 rounded-xl ${item.bg} ${item.color} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-${item.color.split('-')[1]}-500/20`}>
              {React.cloneElement(item.icon, { size: 16 })}
            </div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">{item.label}</p>
          </div>
          <p className="text-xl font-bold text-white tracking-tight relative z-10">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
