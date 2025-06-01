import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BatteryCharging as ChargingPile, LogOut } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="shadow-sm border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ChargingPile className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-semibold text-gray-800">VoltSpot</span>
            </Link>
          </div>

          <div className='flex items-center gap-8'>
            <Link
              to="/home"
              className='px-3 py-2 cursor-pointer rounded-md text-sm text-gray-700 font-medium flex items-center hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150 ease-in-out'>
              Home
            </Link>
            {
              isAuthenticated && (
                <>
                  <Link
                    to="/map"
                    className='px-3 py-2 cursor-pointer rounded-md text-sm text-gray-700 font-medium flex items-center hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150 ease-in-out'>
                    Maps
                  </Link>
                  <Link
                    to="/dashboard"
                    className='px-3 py-2 cursor-pointer rounded-md text-sm text-gray-700 font-medium flex items-center hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150 ease-in-out'>
                    Dashboard
                  </Link>
                </>
              )
            }
          </div>
          {
            !isAuthenticated && (
              <Link
                to="/login"
                className="px-3 py-2 border-[2px] rounded-lg  flex items-center text-sm text-white bg-black hover:text-black hover:bg-transparent transition-colors duration-150 ease-in-out"
              >
                <LogOut className="w-5 h-5 mr-1.5" />
                Login
              </Link>
            )}
          {isAuthenticated && (

            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 flex items-center transition-colors duration-150 ease-in-out"
            >
              <LogOut className="w-5 h-5 mr-1.5" />
              Logout
            </button>

          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;