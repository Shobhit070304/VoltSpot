import React, { useState, useEffect, useRef } from "react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import { AlertTriangle, MapPin } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import { Locate, LocateFixed, LocateIcon, ZoomIn, ZoomOut } from "lucide-react";

const MapView = ({ station }) => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const path = useLocation().pathname;

  // Load Leaflet dynamically from CDN
  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.onload = () => setMapLoaded(true);
        link.onerror = () => {
          console.error('Failed to load Leaflet CSS');
          setError('Failed to load map styles');
        };
        document.head.appendChild(link);
      };
      script.onerror = () => {
        console.error('Failed to load Leaflet JS');
        setError('Failed to load map library');
      };
      document.head.appendChild(script);
    };

    loadLeaflet();

    return () => {
      // Cleanup map instance when component unmounts
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Fetch stations
  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);

        let stationsData = [];

        if (station) {
          // single station page
          stationsData = [station];
        } else {
          // map page: fetch all stations
          const response = await api.get("/station"); // backend returns { stations: [...] }
          stationsData = response.data.stations;
        }

        // filter only stations with valid coordinates
        setStations(stationsData.filter(s => s.latitude && s.longitude));

      } catch (err) {
        toast.error("Error fetching stations");
        setError(err.message || "Error fetching stations");
      } finally {
        setLoading(false);
      }
    };


    fetchStations();
  }, [station]);

  // Initialize or update map
  useEffect(() => {
    if (!mapLoaded || stations.length === 0) return;

    const L = window.L;
    const mapContainer = document.getElementById("map");

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Initialize map if not already exists
    if (!mapRef.current) {
      const centerStation = station || stations[0];
      mapRef.current = L.map("map").setView(
        [centerStation.latitude, centerStation.longitude],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(mapRef.current);
    }

    // Add markers for all stations
    stations.forEach(st => {
      const markerColor = st.status === "Active" ? "#10b981" : "#f59e0b";
      const icon = L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: ${markerColor}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.2);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([st.latitude, st.longitude], { icon })
        .addTo(mapRef.current)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-gray-900">${st.name}</h3>
            <p class="text-sm text-gray-600 mt-1">
              <span class="inline-flex items-center">
                <svg class="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                ${st.location}
              </span>
            </p>
            <div class="mt-2 flex items-center space-x-2">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${st.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }">
                ${st.status}
              </span>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                ${st.powerOutput} kW
              </span>
            </div>
            <a href="/station/${st._id}" class="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
              View details →
            </a>
          </div>
        `);

      markersRef.current.push(marker);
    });

    // Fit bounds if showing multiple stations
    if (!station && stations.length > 1) {
      const bounds = L.latLngBounds(stations.map(s => [s.latitude, s.longitude]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

  }, [mapLoaded, stations, station]);

  // Map control functions
  const zoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };

  const zoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };
  //Mark the user's location on the map with user icon
  const locateUser = () => {
    if (mapRef.current && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          mapRef.current.flyTo([pos.coords.latitude, pos.coords.longitude], 13);
          const marker = L.marker([pos.coords.latitude, pos.coords.longitude], {
            icon: L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/5216/5216405.png",
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            })
          }).addTo(mapRef.current);
          markersRef.current.push(marker);
        },
        (err) => {
          toast.error("Could not get your location");
          console.error(err);
        }
      );
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 text-gray-900 overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
        <div className="absolute top-[50%] left-[50%] w-[18rem] h-[18rem] bg-yellow-200/20 rounded-full blur-[60px] opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        {/* Header Section */}
        <header className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-black mb-1">
                Charging Network Map
              </h1>
              <p className="text-sm text-amber-500">
                {station ? "Viewing station location" : "Explore all available charging stations"}
              </p>
            </div>
            <Link
              to="/home"
              className="flex items-center text-sm text-orange-400 hover:text-blue-300 transition-colors"
            >
              <FaChevronLeft className="mr-2 h-3 w-3" />
              Back to stations
            </Link>
          </div>
        </header>

        {/* Map Container */}
        <div className="bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800/50 overflow-hidden shadow-2xl">
          <div className="relative h-[calc(100vh-220px)] min-h-[500px]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-blue-500 mb-4"></div>
                <p className="text-sm text-gray-300">
                  Loading map data...
                </p>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm">
                <div className="bg-red-900/30 backdrop-blur-sm rounded-xl border border-red-800/50 p-6 max-w-md mx-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-red-200 mb-1">
                        Map Loading Error
                      </h3>
                      <p className="text-sm text-red-300">
                        {error}
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="mt-4 inline-flex items-center px-4 py-2 text-sm rounded-lg border border-red-800/50 text-red-300 bg-red-900/20 hover:bg-red-900/30 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : stations.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 p-8 text-center max-w-md">
                  <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700/50">
                    <MapPin className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No Stations Available
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    There are currently no charging stations to display on the map.
                  </p>
                  <Link
                    to="/home"
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Browse Stations
                  </Link>
                </div>
              </div>
            ) : (
              <div id="map" className="h-full w-full z-0"></div>
            )}
          </div>
        </div>

        {/* Map Controls */}
        <div className="mt-6 flex justify-between items-center">
          {/* Location Control */}
          <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 px-3 py-2 shadow-md">
            <button
              onClick={locateUser}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
              aria-label="Locate Me"
            >
              <LocateFixed className="h-5 w-5" />
              <span>Locate Me</span>
            </button>


          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl px-2 py-1.5 shadow-md">
            <button
              onClick={zoomIn}
              className="flex items-center justify-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              aria-label="Zoom In"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <button
              onClick={zoomOut}
              className="flex items-center justify-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              aria-label="Zoom Out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default MapView;