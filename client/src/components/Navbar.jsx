import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BatteryCharging as ChargingPile, LogOut, Menu, X } from "lucide-react";
import logo from "../assets/charging.png";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false); // close mobile menu on logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex w-full justify-center">
      <nav
        className={`fixed mx-auto w-[90%] top-4 z-50 py-1 px-5 transition-all duration-300 ${
          isScrolled
            ? "rounded-full bg-gray-900/90 border border-gray-700/50 shadow-xl backdrop-blur-xl"
            : "rounded-lg bg-gray-900/50 border border-gray-800/30 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto px-3 sm:px-4">
          <div
            className={`flex justify-between items-center ${
              isScrolled ? "h-12" : "h-14"
            } transition-all duration-300`}
          >
            {/* Logo - More compact */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img
                  src={logo}
                  alt="logo"
                  className={`${
                    isScrolled ? "h-6 w-6" : "h-7 w-7"
                  } transition-all duration-300`}
                />
                <span
                  className={`ml-1.5 ${
                    isScrolled ? "text-lg" : "text-xl"
                  } font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 transition-all duration-300`}
                >
                  VoltSpot
                </span>
              </Link>
            </div>

            {/* Desktop Links - More compact */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/home"
                className={`px-2.5 py-1.5 text-sm font-light tracking-wide ${
                  isScrolled ? "text-gray-300" : "text-gray-300"
                } hover:text-white rounded-full hover:bg-gray-800/50 transition-all duration-200`}
              >
                Stations
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/map"
                    className="px-2.5 py-1.5 text-sm font-light tracking-wide text-gray-300 hover:text-white rounded-full hover:bg-gray-800/50 transition-all duration-200"
                  >
                    Map
                  </Link>
                  <Link
                    to="/saved-stations"
                    className="px-2.5 py-1.5 text-sm font-light tracking-wide text-gray-300 hover:text-white rounded-full hover:bg-gray-800/50 transition-all duration-200"
                  >
                    Saved
                  </Link>
                  <Link
                    to="/dashboard"
                    className="px-2.5 py-1.5 text-sm font-light tracking-wide text-gray-300 hover:text-white rounded-full hover:bg-gray-800/50 transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>

            {/* Auth Buttons (Desktop) - More compact */}
            <div className="hidden md:flex items-center gap-1.5">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className={`px-3 py-1 flex items-center text-[0.8rem] font-light tracking-wide text-white rounded-full transition-all duration-300 shadow`}
                >
                  <LogOut className="w-3 h-3 mr-1.5" />
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 flex items-center text-[0.8rem] font-light tracking-wide ${
                    isScrolled
                      ? "bg-red-600/90"
                      : "bg-gradient-to-r from-red-600 to-pink-600"
                  } text-white rounded-full hover:bg-red-500 transition-all duration-300 shadow`}
                >
                  <LogOut className="w-3 h-3 mr-1.5" />
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Menu Button - More compact */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4.5 h-4.5" />
                ) : (
                  <Menu className="w-4.5 h-4.5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu - More compact */}
          {isMobileMenuOpen && (
            <div
              className={`md:hidden mt-1 mb-2 space-y-1 transition-all duration-300 ${
                isScrolled ? "mx-1.5" : "mx-1"
              }`}
            >
              <Link
                to="/home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-light tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                Stations
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/map"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-light tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    Map
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-light tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              )}
              <div className="pt-1 border-t border-gray-800/30">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-light tracking-wide text-center text-white bg-indigo-600/90 hover:bg-indigo-500 rounded-lg shadow transition-colors"
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full px-3 py-2 text-xs font-light tracking-wide text-center text-white bg-red-600/90 hover:bg-red-500 rounded-lg shadow transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
