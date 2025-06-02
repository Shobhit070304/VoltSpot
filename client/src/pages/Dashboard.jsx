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
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden pt-[10vh]">
      {/* Background glow effects - matching map view */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-900/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-900/20 rounded-full filter blur-[100px]"></div>
      </div>
  
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Overview of your charging station network</p>
        </div>
  
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 flex items-start">
                <div className="p-3 rounded-full bg-blue-900/30 text-blue-400 mr-4 backdrop-blur-sm border border-blue-700/30">
                  <ChargingPile className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Stations</p>
                  <p className="text-2xl font-semibold text-white">{stats.totalStations}</p>
                </div>
              </div>
  
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 flex items-start">
                <div className="p-3 rounded-full bg-green-900/30 text-green-400 mr-4 backdrop-blur-sm border border-green-700/30">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Stations</p>
                  <p className="text-2xl font-semibold text-white">{stats.activeStations}</p>
                </div>
              </div>
  
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 flex items-start">
                <div className="p-3 rounded-full bg-yellow-900/30 text-yellow-400 mr-4 backdrop-blur-sm border border-yellow-700/30">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Inactive Stations</p>
                  <p className="text-2xl font-semibold text-white">{stats.inactiveStations}</p>
                </div>
              </div>
  
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 flex items-start">
                <div className="p-3 rounded-full bg-purple-900/30 text-purple-400 mr-4 backdrop-blur-sm border border-purple-700/30">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Avg. Power Output</p>
                  <p className="text-2xl font-semibold text-white">{stats.avgPowerOutput.toFixed(2)} kW</p>
                </div>
              </div>
            </div>
  
            {/* Charging Stations Table */}
            {/* <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg overflow-hidden"> */}
              <ChargingStations stations={stations} setStations={setStations} />
            {/* </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;