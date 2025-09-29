import React, { useState, useEffect, Suspense } from 'react';

const MapViewLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 text-gray-900 overflow-hidden pt-16">
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
      <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
      <div className="absolute top-[50%] left-[50%] w-[18rem] h-[18rem] bg-yellow-200/20 rounded-full blur-[60px] opacity-30 animate-pulse"></div>
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-black mb-1">
              Charging Network Map
            </h1>
            <p className="text-sm text-amber-500">
              Loading map view...
            </p>
          </div>
        </div>
      </header>
      
      <div className="bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800/50 overflow-hidden shadow-2xl">
        <div className="relative h-[calc(100vh-220px)] min-h-[500px]">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-blue-500 mb-4"></div>
            <p className="text-sm text-gray-300">
              Loading map data...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DynamicMapView = (props) => {
  const [MapView, setMapView] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const module = await import('./MapView');
        setMapView(() => module.default);
      } catch (error) {
        // Silent fail
      }
    };
    
    loadComponent();
  }, []);

  if (!MapView) {
    return <MapViewLoader />;
  }

  return <MapView {...props} />;
};

export default DynamicMapView;