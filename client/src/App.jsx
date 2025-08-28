import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/general/Home";
import LandingPage from "./pages/general/LandingPage";
import Station from "./pages/stations/Station";
import MapView from "./pages/map/MapView";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/general/NotFound";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SavedStations from "./pages/stations/SavedStations";

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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {path !== "login" && path !== "register" && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
