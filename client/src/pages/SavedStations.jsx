import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";
import { FaBolt, FaChevronRight, FaLocationArrow, FaPlug, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Heart, HeartIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function SavedStations() {
  const [savedStations, setSavedStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuth();

  const fetchSavedStations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/station/saved-stations");
      console.log("Saved stations response:", response);

      if (response.status === 200) {
        setSavedStations(response.data.savedStations);
      } else {
        setError("Failed to fetch saved stations");
        toast.error("Failed to fetch saved stations");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Error fetching saved stations");
    } finally {
      setLoading(false);
    }
  };

  // Handle unsaving a station
  const handleUnsaveStation = async (stationId) => {
    try {
      const response = await api.post(`/station/save/${stationId}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        // Update local state to remove the unsaved station
        setSavedStations(savedStations.filter(station => station._id !== stationId));
        // Update user context
        setUser(prev => ({
          ...prev,
          savedStations: response.data.savedStations
        }));
      }
    } catch (error) {
      toast.error("Error removing station from saved list");
    }
  };

  useEffect(() => {
    fetchSavedStations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading saved stations...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8 pt-[20vh]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Saved Stations</h1>
        
        {savedStations.length === 0 ? (
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm p-12 text-center">
            <div className="mx-auto h-24 w-24 text-gray-500">
              <Heart className="w-full h-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">No saved stations</h3>
            <p className="mt-2 text-sm text-gray-400">
              You haven't saved any stations yet. Browse stations and click the heart icon to save them.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
              >
                Browse Stations
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {savedStations.map((station) => (
              <div
                key={station._id}
                className="rounded-xl border border-gray-700 bg-gray-700/20 backdrop-blur-lg hover:bg-gray-800/50 transition-all duration-300 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  {/* Station Info */}
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                      station.status === "Active"
                        ? "bg-green-900/30 text-green-400 border border-green-800"
                        : "bg-yellow-900/30 text-yellow-400 border border-yellow-800"
                    }`}>
                      <FaPlug className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {station.name}
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2">
                        <div className="flex items-center text-sm text-gray-400">
                          <FaLocationArrow className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
                          {station.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <FaBolt className="flex-shrink-0 mr-1.5 h-4 w-4 text-amber-400" />
                          {station.powerOutput} kW • {station.connectorType}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      station.status === "Active"
                        ? "bg-green-900/30 text-green-400 border border-green-800"
                        : "bg-yellow-900/30 text-yellow-400 border border-yellow-800"
                    }`}>
                      {station.status}
                    </span>
                    <Link
                      to={`/station/${station._id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                    >
                      View Details <FaChevronRight className="ml-2 h-3 w-3" />
                    </Link>
                    <button
                      onClick={() => handleUnsaveStation(station._id)}
                      className="text-red-400 hover:text-red-300 focus:outline-none"
                    >
                      <HeartIcon className="h-5 w-5" fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedStations;
