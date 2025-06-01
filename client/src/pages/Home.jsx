import React, { useEffect, useState } from 'react';
import {
  FaBolt,
  FaChevronRight,
  FaLocationArrow,
  FaPlug
} from 'react-icons/fa';
import { api } from "../services/api"
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Home = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Status colors mapping
  const statusColors = {
    Active: "bg-emerald-100 text-emerald-800",
    Maintenance: "bg-amber-100 text-amber-800",
    Inactive: "bg-red-100 text-red-800"
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await api.get('/station');
        if (response.status === 200) {
          setStations(response.data);
          toast.success('Stations fetched successfully');
        }
      } catch (error) {
        setError(error);
        toast.error('Error fetching stations');
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center py-10 bg-white">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Explore EV Charging Stations
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
            Find and compare electric vehicle charging stations near you. Get details on location, availability, charging types, and more — all in one place.
          </p>
        </div>

        {/* Stations List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Charging Stations</h2>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {stations.map((station) => (
                <li key={station._id}>
                  <div className="px-4 py-5 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
                          <FaPlug className="text-blue-600" size={18} />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {station.name}
                          </h3>
                          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <FaLocationArrow className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {station.location}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <FaBolt className="flex-shrink-0 mr-1.5 h-4 w-4 text-amber-400" />
                              {station.powerOutput} {station.type}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[station.status]}`}>
                          {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
                        </span>
                        <Link to={`/station/${station._id}`} className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500">
                          Details <FaChevronRight className="inline ml-1" size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;