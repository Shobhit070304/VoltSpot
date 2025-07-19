import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BatteryCharging as ChargingPile, LogOut, Menu, User, X, Zap } from "lucide-react";
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
        className={`fixed mx-auto w-[92%] max-w-6xl top-4 z-50 transition-all duration-300 ${isScrolled
          ? "rounded-xl bg-gray-900/95 border border-gray-700/40 shadow-sm backdrop-blur-lg py-1.5"
          : "rounded-lg bg-gray-900/80 border border-gray-800/20 backdrop-blur-md py-2"
          }`}
      >
        <div className="mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Logo - Ultra minimal */}
            <Link to="/" className="flex items-center group">

              <img
                src={logo}
                alt="logo"
                className={`${isScrolled ? "h-6 w-6" : "h-7 w-7"
                  } transition-all duration-300`}
              />

              <span className={`ml-2 font-medium tracking-tight ${isScrolled ? "text-sm" : "text-base"
                } bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-indigo-100 transition-all duration-300`}>
                Voltspot
              </span>
            </Link>

            {/* Desktop Navigation - Compact and elegant */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/home"
                className={`px-3 py-1 text-[0.78rem] font-light tracking-wide ${isScrolled ? "text-gray-300" : "text-gray-300"
                  } hover:text-white rounded-lg transition-all duration-150`}
              >
                Stations
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/map"
                    className="px-3 py-1 text-[0.78rem] font-light tracking-wide text-gray-300 hover:text-white rounded-lg transition-all duration-150"
                  >
                    Map
                  </Link>
                  <Link
                    to="/dashboard"
                    className="px-3 py-1 text-[0.78rem] font-light tracking-wide text-gray-300 hover:text-white rounded-lg transition-all duration-150"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>

            {/* Auth Section - Refined */}
            <div className="hidden md:flex items-center space-x-2">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className={`px-3.5 py-1.5 flex items-center text-[0.78rem] font-light tracking-wide ${isScrolled
                    ? "bg-white/5 hover:bg-white/10 border border-white/5"
                    : "bg-indigo-600/90 hover:bg-indigo-500"
                    } text-white rounded-lg transition-all duration-200 shadow-sm`}
                >
                  Sign In
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLogout}
                    className={`px-3.5 py-1.5 flex items-center text-[0.78rem] font-light tracking-wide ${isScrolled
                      ? "bg-white/5 hover:bg-white/10 border border-white/5"
                      : "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30"
                      } text-gray-200 hover:text-white rounded-lg transition-all duration-200 shadow-sm`}
                  >
                    Logout
                  </button>
                  <Link
                    to="/dashboard"
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-gray-300" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button - Minimal */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-1.5 rounded-lg ${isMobileMenuOpen
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
                  } transition-all duration-200`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Sleek dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 pb-2 space-y-1">
              <Link
                to="/home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-light tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Stations
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/map"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-light tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Map
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-light tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              )}
              <div className="pt-2 mt-2 border-t border-white/5">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-medium tracking-wide text-center text-white bg-indigo-600/90 hover:bg-indigo-500 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full px-3 py-2 text-xs font-medium tracking-wide text-center text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
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
