import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BatteryCharging as ChargingPile, MapPin, Zap, Battery, AlertTriangle, CheckCircle2 } from 'lucide-react';
import ChargingStations from './ChargingStations';
import toast from 'react-hot-toast';


const Dashboard = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await api.get('/station/me');

        if (response.status === 200) {
          const stationsData = response.data.stations || []; // Fallback to empty array
          setStations(stationsData);


          // Calculate stats only if there are stations
          const statsData = {
            totalStations: stationsData.length,
            activeStations: stationsData.filter(station => station.status === 'Active').length,
            inactiveStations: stationsData.filter(station => station.status === 'Inactive').length,
            avgPowerOutput: stationsData.length > 0
              ? stationsData.reduce((sum, station) => sum + (station.powerOutput || 0), 0) / stationsData.length
              : 0
          };
          setStats(statsData);

          // toast.success('Stations fetched successfully');
        }
      } catch (error) {
        setError(error);
        toast.error(error.message || 'Error fetching stations');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your charging station network</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <ChargingPile className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Stations</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalStations}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Active Stations</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.activeStations}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Inactive Stations</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.inactiveStations}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Avg. Power Output</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.avgPowerOutput.toFixed(2)} kW</p>
          </div>
        </div>
      </div>
      <ChargingStations stations={stations} setStations={setStations} />
    </div>
  );
};

export default Dashboard;