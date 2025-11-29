import React, { memo, useEffect, useState } from "react";
import { MapPin, Zap, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

const StationCard = ({
  station,
  viewMode,
  handleSaveStation,
  isStationSaved,
}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/review/${station._id}`);
        if (response.status === 200 && isMounted) {
          setReviews(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setError(true);
          toast.error("Failed to fetch reviews");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []); // 👈 empty deps → runs only once on mount

  return (
    <div
      key={station._id}
      className={`bg-white/80 rounded-xl border border-orange-100 hover:bg-orange-50 transition-all group ${
        viewMode === "list" ? "p-4" : "p-5"
      }`}
    >
      {viewMode === "grid" ? (
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                {station.name}
              </h3>
              <div className="flex items-center text-xs text-gray-500 mb-1 font-medium">
                <MapPin className="h-3 w-3 mr-2 text-orange-400" />
                {station.location}
              </div>
              <div className="flex items-center text-xs text-gray-500 font-medium">
                <Zap className="h-3 w-3 mr-2 text-orange-400" />
                {station.powerOutput} kW • {station.connectorType}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  station.status === "Active"
                    ? "bg-green-500/20 text-green-500 border border-green-500/30"
                    : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                }`}
              >
                {station.status}
              </span>
              <button
                onClick={() => handleSaveStation(station._id)}
                className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isStationSaved
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 text-amber-400 mr-1" />
                <span className="text-xs font-medium text-gray-700">
                  {station.averageRating ? station.averageRating.toFixed(1) : 0}
                </span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-xs text-gray-500">
                {reviews?.length || 0} reviews
              </span>
            </div>

            <Link
              to={`/station/${station._id}`}
              className="text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {station.name}
              </h3>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  station.status === "Active"
                    ? "bg-green-500/20 text-green-500 border border-green-500/30"
                    : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                }`}
              >
                {station.status}
              </span>
            </div>

            <div className="flex items-center text-xs text-gray-500 mb-1 font-medium">
              <MapPin className="h-3 w-3 mr-2 text-orange-400" />
              {station.location}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="h-3 w-3 mr-2 text-orange-400" />
                <span className="text-xs text-gray-700 font-medium">
                  {station.powerOutput} kW • {station.connectorType}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 text-amber-400 mr-1" />
                  <span className="text-xs font-medium text-gray-700">
                    {station.averageRating
                      ? station.averageRating.toFixed(1)
                      : 0}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleSaveStation(station._id)}
                  className="p-1.5 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      isStationSaved
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  />
                </button>
                <Link
                  to={`/station/${station._id}`}
                  className="text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(StationCard);
