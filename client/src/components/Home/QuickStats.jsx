import { MapPin, Activity, Battery, Star } from "lucide-react";

const QuickStats = ({ stats }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-3xl mx-auto mb-4">
        {[
            { icon: <MapPin className="h-3 w-3" />, value: stats.total, label: "Total" },
            { icon: <Activity className="h-3 w-3" />, value: stats.active, label: "Active" },
            { icon: <Battery className="h-3 w-3" />, value: `${stats.averagePower.toFixed(1)}kW`, label: "Avg Power" },
            { icon: <Star className="h-3 w-3" />, value: stats.averageRating.toFixed(1), label: "Avg Rating" },
        ].map((stat, i) => (
            <div key={i} className="bg-white/80 rounded-lg border border-orange-100 p-2 text-center shadow-sm">
                <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-lg mb-1 mx-auto">
                    <div className="text-orange-500">{stat.icon}</div>
                </div>
                <div className="text-base font-bold text-gray-900">{stat.value}</div>
                <div className="text-[10px] text-gray-500 font-medium">{stat.label}</div>
            </div>
        ))}
    </div>
);

export default QuickStats;