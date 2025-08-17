import useRecentlyViewed from "../hooks/useRecentlyViewed";
import { Link } from "react-router-dom";

function RecentlyViewed() {
  const { recentStations } = useRecentlyViewed();

  if (!recentStations?.length) return null;

  return (
    <div className="bg-amber-100 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">Recently Viewed</h2>
      <ul className="space-y-2">
        {recentStations?.map((station) => (
          <li key={station._id}>
            <Link
              to={`/station/${station._id}`}
              className="block p-2 bg-white rounded-lg hover:scale-[1.02] transition"
            >
              <p>{station.name}</p>
              <p className="text-sm text-gray-500">{station.location}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentlyViewed;
