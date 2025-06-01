import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChargingStations from './pages/ChargingStations';
import MapView from './pages/MapView';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Station from './pages/Station';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />

          <Route path="/home" element={<Home />} />
          <Route path="/station/:id" element={<Station />} />
          <Route path="/dashboard" element={
            // <ProtectedRoute>
            <Dashboard />
            // </ProtectedRoute>
          } />
          <Route path="/charging-stations" element={
            // <ProtectedRoute>
            <ChargingStations />
            // </ProtectedRoute>
          } />
          <Route path="/map" element={
            // <ProtectedRoute>
            <MapView />
            // </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;