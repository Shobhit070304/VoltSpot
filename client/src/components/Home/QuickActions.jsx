import { Link } from "react-router-dom";
import { Map, Heart, TrendingUp, ArrowRight } from "lucide-react";

const actions = [
  {
    to: "/map",
    icon: <Map className="h-3 w-3 text-orange-500" />,
    title: "Map View",
    desc: "Explore on map",
  },
  {
    to: "/saved-stations",
    icon: <Heart className="h-3 w-3 text-orange-500" />,
    title: "Saved",
    desc: "Your favorites",
  },
  {
    to: "/dashboard",
    icon: <TrendingUp className="h-3 w-3 text-orange-500" />,
    title: "Dashboard",
    desc: "Manage stations",
  },
];

const QuickActions = () => (
  <div className="mb-5">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {actions.map((a, i) => (
        <Link
          key={i}
          to={a.to}
          className="group bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg border border-orange-200 p-3 hover:border-orange-300 transition-all duration-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="w-6 h-6 bg-orange-200 rounded-lg flex items-center justify-center mb-1">
                {a.icon}
              </div>
              <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                {a.title}
              </h3>
              <p className="text-[11px] text-gray-500">{a.desc}</p>
            </div>
            <ArrowRight className="h-3 w-3 text-orange-400 group-hover:text-orange-600 transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default QuickActions;
