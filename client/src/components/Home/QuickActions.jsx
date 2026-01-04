import { Link } from "react-router-dom";
import { Map, Heart, TrendingUp, ArrowRight } from "lucide-react";

const actions = [
  {
    to: "/map",
    icon: <Map size={16} className="text-blue-500" />,
    title: "Map View",
    desc: "Explore on map",
  },
  {
    to: "/saved-stations",
    icon: <Heart size={16} className="text-purple-500" />,
    title: "Saved",
    desc: "Your favorites",
  },
  {
    to: "/dashboard",
    icon: <TrendingUp size={16} className="text-blue-500" />,
    title: "Dashboard",
    desc: "Manage stations",
  },
];

const QuickActions = () => (
  <div className="mb-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((a, i) => (
        <Link
          key={i}
          to={a.to}
          className="group glass-panel p-5 hover:bg-white/[0.04] transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                {a.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-0.5">
                  {a.title}
                </h3>
                <p className="text-xs text-reflect-muted">{a.desc}</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-reflect-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default QuickActions;
