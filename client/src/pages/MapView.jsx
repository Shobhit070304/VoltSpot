import React, { useState, useEffect } from 'react';
import { stationsApi } from '../services/api';
import { BatteryCharging as ChargingPile, Layers, ZoomIn, ZoomOut } from 'lucide-react';

const MapView = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    fetchStations();

    // Load OpenStreetMap script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
    script.crossOrigin = '';
    script.onload = () => setMapLoaded(true);
    
    document.body.appendChild(script);
    
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
    link.crossOrigin = '';
    
    document.head.appendChild(link);
    
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);
  
  const fetchStations = async () => {
    try {
      setLoading(true);
      const response = await stationsApi.getAll();
      // For demo purposes, let's create some mock data if none exists
      const stationsData = response.data && response.data.length > 0 
        ? response.data 
        : createMockStations();
      
      setStations(stationsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching stations:', err);
      setError('Failed to load charging stations. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const createMockStations = () => {
    // Generate mock data for demonstration
    return [
      {
        id: 1,
        name: 'Downtown Fast Charger',
        location: '123 Main St, Downtown',
        latitude: 40.7128,
        longitude: -74.0060,
        status: 'Active',
        powerOutput: 150,
        connectorType: 'CCS',
      },
      {
        id: 2,
        name: 'Riverside Charging Hub',
        location: 'Riverside Park, East Wing',
        latitude: 40.7214,
        longitude: -74.0120,
        status: 'Active',
        powerOutput: 50,
        connectorType: 'Type 2',
      },
      {
        id: 3,
        name: 'Shopping Mall Charger',
        location: 'City Mall, Level P2',
        latitude: 40.7310,
        longitude: -73.9950,
        status: 'Inactive',
        powerOutput: 75,
        connectorType: 'CCS/CHAdeMO',
      },
      {
        id: 4,
        name: 'North Station Fast Charge',
        location: '45 North Ave',
        latitude: 40.7350,
        longitude: -74.0200,
        status: 'Active',
        powerOutput: 350,
        connectorType: 'CCS',
      },
      {
        id: 5,
        name: 'East Side Parking Charger',
        location: 'East Side Parking Garage, Level 1',
        latitude: 40.7180,
        longitude: -73.9830,
        status: 'Inactive',
        powerOutput: 22,
        connectorType: 'Type 2',
      }
    ];
  };

  useEffect(() => {
    if (mapLoaded && stations.length > 0) {
      // Initialize map
      const L = window.L;
      const mapContainer = document.getElementById('map');
      
      if (!mapContainer._leaflet_id) {
        // Calculate center of all stations
        const avgLat = stations.reduce((sum, station) => sum + station.latitude, 0) / stations.length;
        const avgLng = stations.reduce((sum, station) => sum + station.longitude, 0) / stations.length;
        
        // Create map
        const map = L.map('map').setView([avgLat, avgLng], 13);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add markers for each station
        stations.forEach(station => {
          const markerColor = station.status === 'Active' ? 'green' : 'orange';
          
          // Custom icon
          const icon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });
          
          const marker = L.marker([station.latitude, station.longitude], { icon }).addTo(map);
          
          // Add click event to show popup
          marker.on('click', () => {
            setSelectedStation(station);
          });
        });
        
        // Add zoom controls
        map.zoomControl.setPosition('bottomright');
      }
    }
  }, [mapLoaded, stations]);

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
                      <p className={`text-sm font-medium ${
                        selectedStation.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
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
                        {selectedStation.latitude.toFixed(6)}, {selectedStation.longitude.toFixed(6)}
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