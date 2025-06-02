import React, { useState, useEffect } from 'react';
import { stationsApi } from '../services/api';
import { BatteryCharging as ChargingPile, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

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






  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Map View</h1>
          <p className="text-gray-600 mt-1">View all charging stations on the map</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative h-[calc(100vh-260px)] min-h-[500px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          ) : (
            <>
              <div id="map" className="h-full w-full z-0"></div>

              {/* Selected station info */}
              {selectedStation && (
                <div className="absolute right-4 top-4 bg-white shadow-lg rounded-lg p-4 max-w-xs w-full z-10">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{selectedStation.name}</h3>
                    <button
                      onClick={() => setSelectedStation(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">{selectedStation.location}</p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Status</p>
                      <p className={`text-sm font-medium ${selectedStation.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                        {selectedStation.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Power</p>
                      <p className="text-sm font-medium text-gray-900">{selectedStation.powerOutput} kW</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-medium text-gray-500">Connector Type</p>
                      <p className="text-sm font-medium text-gray-900">{selectedStation.connectorType}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-medium text-gray-500">Coordinates</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedStation.latitude.toFixed(2)}, {selectedStation.longitude.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;