import useRecentlyViewed from "../../hooks/useRecentlyViewed";
import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";

function RecentlyViewed() {
  const { recentStations } = useRecentlyViewed();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-white">
        <Clock size={18} className="text-blue-500" />
        <h2 className="text-sm font-semibold uppercase tracking-widest">Recently Viewed</h2>
      </div>

      {recentStations?.length > 0 ? (
        <ul className="space-y-3">
          {recentStations?.map((station) => (
            <li key={station._id}>
              <Link
                to={`/station/${station._id}`}
                className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/30 transition-all group"
              >
                <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{station.name}</p>
                <div className="flex items-center text-[10px] text-reflect-muted mt-1">
                  <MapPin size={10} className="mr-1" />
                  {station.location}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-8 text-center bg-white/5 border border-white/10 border-dashed rounded-xl">
          <p className="text-xs text-reflect-muted">No recently viewed stations</p>
        </div>
      )}
    </div>
  );
}

export default RecentlyViewed;
