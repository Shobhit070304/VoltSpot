import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import {
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  // Locate,
  MapPin,
  Heart,
} from "react-feather";
import { Locate } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MapView = ({ station }) => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null); // Store Leaflet map instance
  // Load Leaflet JS and CSS
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
    script.onload = () => setMapLoaded(true);
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
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
        if (station) {
          setStations([station]);
        } else {
          const response = await api.get("/station"); // Fetch all stations
          if (response.status === 200) {
            setStations(response.data || []);
            toast.success("Stations fetched successfully");
          }
        }
      } catch (err) {
        toast.error("Error fetching stations");
        setError("Error fetching stations");
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

    const selected = station || stations[0];
    if (!selected || !selected.latitude || !selected.longitude) return;

    // If map already exists, just set view and return
    if (map) {
      map.setView([selected.latitude, selected.longitude], 13);
      return;
    }

    // Remove any existing map instance
    if (mapContainer && mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null;
    }

    const newMap = L.map("map").setView(
      [selected.latitude, selected.longitude],
      13
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(newMap);

    stations.forEach((st) => {
      if (!st.latitude || !st.longitude) return;
      const markerColor = st.status === "Active" ? "green" : "orange";
      const icon = L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([st.latitude, st.longitude], { icon }).addTo(
        newMap
      );
      marker.bindPopup(`<b>${st.name || "Charging Station"}</b>`);
    });

    setMap(newMap);
  }, [mapLoaded, stations, station]);

  const path = useLocation().pathname;
  return (
    <div
      className={`min-h-screen relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden py-20 ${
        path === "/map" && "py-12"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[40rem] h-[40rem] bg-blue-900/10 rounded-full blur-[120px] opacity-20 animate-float"></div>
        <div className="absolute bottom-[20%] right-[25%] w-[35rem] h-[35rem] bg-indigo-900/10 rounded-full blur-[100px] opacity-15 animate-float-delay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-light text-white mb-1 tracking-tight">
                Charging Network Map
              </h1>
              <p className="text-xs text-gray-400 font-light tracking-wide">
                Explore all available charging stations
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/home"
                className="inline-flex items-center text-xs font-light tracking-wide text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FaChevronLeft className="mr-1.5 h-3 w-3" />
                Back to list view
              </Link>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 overflow-hidden shadow-xl">
          <div className="relative h-[calc(100vh-220px)] min-h-[500px]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/70 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-700 border-t-blue-500 mb-4"></div>
                <p className="text-sm text-gray-400 font-light tracking-wide">
                  Loading map data...
                </p>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm">
                <div className="bg-red-900/30 backdrop-blur-sm rounded-lg border border-red-800/50 p-6 max-w-md mx-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-red-200 mb-1">
                        Map Loading Error
                      </h3>
                      <p className="text-xs text-red-300 font-light tracking-wide leading-relaxed">
                        {error.message || "Failed to load map data"}
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="mt-4 inline-flex items-center px-3 py-1.5 text-xs font-light tracking-wide rounded-lg border border-red-800/50 text-red-300 bg-red-900/20 hover:bg-red-900/30 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : stations.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 p-8 text-center max-w-md">
                  <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-700/50">
                    <MapPin className="h-5 w-5 text-gray-500" />
                  </div>
                  <h3 className="text-sm font-light text-white mb-2">
                    No Stations Available
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 font-light tracking-wide leading-relaxed">
                    There are currently no charging stations to display on the
                    map.
                  </p>
                  <Link
                    to="/home"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-light tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
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
        <div className="mt-4 flex justify-end">
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg border border-gray-800/50 p-2 inline-flex space-x-2">
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
              <ZoomOut className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
              <Locate className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
