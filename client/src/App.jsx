import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Lazy loaded pages
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/general/Home"));
const LandingPage = lazy(() => import("./pages/general/LandingPage"));
const Station = lazy(() => import("./pages/stations/Station"));
const MapView = lazy(() => import("./pages/map/DynamicMapView"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const NotFound = lazy(() => import("./pages/general/NotFound"));
const SavedStations = lazy(() => import("./pages/stations/SavedStations"));
const CostEstimator = lazy(() => import("./components/cards/CostEstimator"));

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const path = useLocation().pathname.split("/")[1];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {path !== "login" && path !== "register" && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/stations" element={<Home />} />
            <Route path="/station/:id" element={<Station />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-stations"
            element={
              <ProtectedRoute>
                <SavedStations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/estimate"
            element={
              <ProtectedRoute>
                <CostEstimator />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      {path !== "login" && path !== "register" && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
