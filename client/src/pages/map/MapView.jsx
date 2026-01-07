import React, { useState, useEffect, useRef } from "react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { AlertTriangle, MapPin, ChevronLeft, LocateFixed, ZoomIn, ZoomOut, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const MapView = ({ station, embedded = false }) => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";

      script.onload = () => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        link.onload = () => setMapLoaded(true);
        document.head.appendChild(link);
      };
      document.head.appendChild(script);
    };

    loadLeaflet();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchStations = async () => {
      try {
        setLoading(true);
        let stationsData = [];
        if (station) {
          stationsData = [station];
        } else {
          const response = await api.get("/station");
          stationsData = response.data.stations || [];
        }

        if (isMounted) {
          const validStations = stationsData.filter(
            (s) => s && typeof s.latitude === "number" && typeof s.longitude === "number",
          );
          setStations(validStations);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch stations.");
          setLoading(false);
        }
      }
    };

    fetchStations();
    return () => { isMounted = false; };
  }, [station]);

  useEffect(() => {
    if (!mapLoaded || stations.length === 0) return;

    const L = window.L;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (!mapRef.current) {
      const centerStation = station || stations[0];
      mapRef.current = L.map("map", { zoomControl: false }).setView(
        [centerStation.latitude, centerStation.longitude],
        13,
      );

      // Google Maps Roadmap tiles
      L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        attribution: '&copy; Google Maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 20
      }).addTo(mapRef.current);
    }

    stations.forEach((st) => {
      const markerColor = st.status === "Active" ? "#10b981" : "#f59e0b";
      let icon;

      if (station) {
        // Station Page: Use Pin Icon
        icon = L.divIcon({
          className: "custom-div-icon",
          html: `
            <div style="filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.15));">
              <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z" fill="${markerColor}"/>
                <path d="M15 10L11 17H15L14 23L20 14H16L17 10H15Z" fill="white" stroke="white" stroke-width="1" stroke-linejoin="round"/>
              </svg>
            </div>
          `,
          iconSize: [32, 42],
          iconAnchor: [16, 42],
          popupAnchor: [0, -42]
        });
      } else {
        // Map Page: Use Dot Icon
        icon = L.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: ${markerColor}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 0 15px ${markerColor}66;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
      }

      const marker = L.marker([st.latitude, st.longitude], { icon }).addTo(
        mapRef.current,
      ).bindPopup(`
          <div class="p-3 bg-white text-slate-900 rounded-xl border border-slate-200 shadow-2xl min-w-[200px]">
            <h3 class="font-bold text-[13px] mb-1 text-slate-900 tracking-tight">${st.name}</h3>
            <p class="text-[10px] text-slate-500 mb-3 flex items-center gap-1 font-medium">
              <svg class="w-3 h-3 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              ${st.location}
            </p>
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${st.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border border-amber-500/20"}">${st.status}</span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-600 border border-blue-500/20">${st.powerOutput} kW</span>
            </div>
            <a href="/station/${st._id}" class="text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors flex items-center gap-1.5">
              View details <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </a>
          </div>
        `, {
        className: 'custom-popup',
        closeButton: false
      });

      markersRef.current.push(marker);
    });

    if (!station && stations.length > 1) {
      const bounds = L.latLngBounds(stations.map((s) => [s.latitude, s.longitude]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [mapLoaded, stations, station]);

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();

  const locateUser = () => {
    if (mapRef.current && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const L = window.L;
          mapRef.current.flyTo([pos.coords.latitude, pos.coords.longitude], 13);

          const userIcon = L.divIcon({
            className: "custom-div-icon",
            html: `
              <div style="filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.15));">
                <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z" fill="#3B82F6"/>
                  <circle cx="16" cy="16" r="6" fill="white"/>
                </svg>
              </div>
            `,
            iconSize: [32, 42],
            iconAnchor: [16, 42],
            popupAnchor: [0, -42]
          });

          L.marker([pos.coords.latitude, pos.coords.longitude], { icon: userIcon }).addTo(mapRef.current);
        },
        () => toast.error("Could not get your location")
      );
    }
  };

  const mapContainer = (
    <div className={embedded ? "relative w-full h-full" : "relative glass-panel overflow-hidden h-[calc(100vh-350px)] min-h-[500px] animate-fade-in border-white/5"}>
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-midnight/50 backdrop-blur-sm z-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/10 border-t-brand-primary mb-4"></div>
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Loading map data</p>
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-midnight/50 backdrop-blur-sm z-20">
          <div className="glass-panel p-8 max-w-md text-center border-white/10">
            <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Map Error</h3>
            <p className="text-[13px] text-slate-500 mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary w-full py-3 text-[11px] font-bold uppercase tracking-widest">Retry</button>
          </div>
        </div>
      ) : stations.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center bg-midnight/50 backdrop-blur-sm z-20">
          <div className="text-center">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
              <MapPin className="h-7 w-7 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">No Stations Found</h3>
            <p className="text-[13px] text-slate-500 mb-8">There are no charging stations to display right now.</p>
            <Link to="/stations" className="btn-primary px-8 py-3 text-[13px] font-bold uppercase tracking-widest">Browse List</Link>
          </div>
        </div>
      ) : null}

      <div id="map" className="h-full w-full z-0"></div>

      {/* Map Controls Overlay */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-10">
        <button
          onClick={locateUser}
          className="p-2.5 bg-midnight/80 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all shadow-2xl"
          title="Locate Me"
        >
          <LocateFixed size={18} />
        </button>
        <div className="flex flex-col bg-midnight/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <button
            onClick={zoomIn}
            className="p-2.5 text-white hover:bg-white/10 transition-all border-b border-white/5"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={zoomOut}
            className="p-2.5 text-white hover:bg-white/10 transition-all"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="w-full h-full relative">
        {mapContainer}
        <style dangerouslySetInnerHTML={{
          __html: `
        .leaflet-container { background: #eef2f7 !important; }
        .custom-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-popup .leaflet-popup-tip { display: none !important; }
        .leaflet-popup-content { margin: 0 !important; }
      `}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 animate-move-grid" />
      <div className="absolute inset-0 grid-dots opacity-40 animate-move-grid [animation-duration:10s]" />

      {/* Aurora Background Effect */}
      <div className="fixed inset-0 bg-aurora pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-slide-up">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-slate-500 mb-4 uppercase tracking-widest">
              <Sparkles className="h-3 w-3 mr-2 text-brand-primary" />
              Interactive Map
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Explore the <span className="text-slate-500">Network.</span>
            </h1>
          </div>
          <Link
            to="/stations"
            className="btn-secondary flex items-center gap-2 !rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest"
          >
            <ChevronLeft size={16} />
            Back to stations
          </Link>
        </header>

        {mapContainer}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .leaflet-container { background: #eef2f7 !important; }
        .custom-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-popup .leaflet-popup-tip { display: none !important; }
        .leaflet-popup-content { margin: 0 !important; }
      `}} />
    </div>
  );
};

export default MapView;
