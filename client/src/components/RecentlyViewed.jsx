import useRecentlyViewed from "../hooks/useRecentlyViewed";
import { Link } from "react-router-dom";

function RecentlyViewed() {
  const { recentStations } = useRecentlyViewed();

  return (
    <div className="bg-amber-100 p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Recently Viewed</h2>
      {recentStations?.length > 0 ? (
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
      ) : (
        <p className="text-sm text-gray-500">No recently viewed stations</p>
      )}
    </div>
  );
}

export default RecentlyViewed;
