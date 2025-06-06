import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const MapView = ({ station }) => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null); // Store Leaflet map instance

  // Load Leaflet JS and CSS
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.onload = () => setMapLoaded(true);
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  // Fetch stations
  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await api.get('/station/me');
        if (response.status === 200) {
          setStations(response.data.stations || []);
          toast.success('Stations fetched successfully');
        }
      } catch (err) {
        toast.error('Error fetching stations');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  // Initialize or update map
  useEffect(() => {
    if (!mapLoaded || stations.length === 0) return;

    const L = window.L;
    const mapContainer = document.getElementById('map');

    const selected = station || stations[0];

    // If map already exists, just set view and return
    if (map) {
      map.setView([selected.latitude, selected.longitude], 13);
      return;
    }

    const newMap = L.map('map').setView([selected.latitude, selected.longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(newMap);

    stations.forEach(st => {
      const markerColor = st.status === 'Active' ? 'green' : 'orange';
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([st.latitude, st.longitude], { icon }).addTo(newMap);
      marker.bindPopup(`<b>${st.name || 'Charging Station'}</b>`);
    });

    setMap(newMap);
  }, [mapLoaded, stations, station]);

  const path = useLocation().pathname;


  return (
    <div className={`min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden   ${path === '/map' && 'py-[10vh]'}`}>
      {/* Background glow effects - matching landing page */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-900/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-900/20 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Header Section */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Map View
            </h1>
            <p className="text-gray-400 mt-2">View all charging stations on the map</p>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-[calc(100vh-260px)] min-h-[500px]">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
                <div className="bg-red-900/30 border-l-4 border-red-500 p-4 max-w-md rounded-lg">
                  <p className="text-red-400">{error}</p>
                </div>
              </div>
            ) : (
              <>
                <div id="map" className="h-full w-full z-0"></div>

                {/* Selected station info */}
                {selectedStation && (
                  <div className="absolute right-4 top-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 max-w-xs w-full z-10 shadow-xl">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-white">{selectedStation.name}</h3>
                      <button
                        onClick={() => setSelectedStation(null)}
                        className="text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <p className="mt-1 text-sm text-gray-400">{selectedStation.location}</p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-medium text-gray-400">Status</p>
                        <p className={`text-sm font-medium ${selectedStation.status === 'Active' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {selectedStation.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400">Power</p>
                        <p className="text-sm font-medium text-white">{selectedStation.powerOutput} kW</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-medium text-gray-400">Connector Type</p>
                        <p className="text-sm font-medium text-white">{selectedStation.connectorType}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-medium text-gray-400">Coordinates</p>
                        <p className="text-sm font-medium text-white">
                          {selectedStation.latitude.toFixed(2)}, {selectedStation.longitude.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <Link
                        to={`/station/${selectedStation._id}`}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
                      >
                        View Station Details
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;