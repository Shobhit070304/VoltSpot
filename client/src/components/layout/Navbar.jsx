import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, User, X, Sun, Moon } from "lucide-react";
import logo from "/charging.png";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          isScrolled
            ? "backdrop-blur-xl bg-white/90 border-b border-orange-200/60 shadow-md h-16"
            : "backdrop-blur-lg bg-white/80 border-b border-orange-100/40 shadow-sm h-20"
        }`}
      >
        <div className="flex-1 flex items-center justify-between px-4 sm:px-8 w-full max-w-7xl">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="logo"
              loading="lazy"
              className={`transition-all duration-300 ${
                isScrolled ? "h-7 w-7" : "h-8 w-8"
              }`}
            />
            <span
              className={`ml-2 font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 ${
                isScrolled ? "text-xl" : "text-2xl"
              } montserrat-regular`}
            >
              voltspot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { to: "/stations", label: "Stations" },
              { to: "/map", label: "Map" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/saved-stations", label: "Saved Stations" },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className={`px-3 py-2 text-sm font-medium tracking-wide ${
                  isScrolled ? "text-orange-700" : "text-orange-600"
                } hover:text-orange-800 rounded-md transition-all duration-200`}
              >
                {label}
              </Link>
            ))}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className={`ml-2 px-4 py-2 flex items-center text-sm font-medium tracking-wide bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 rounded-lg transition-all duration-200 shadow ${
                  isScrolled ? "shadow-md" : "shadow-lg"
                }`}
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <button
                  onClick={logout}
                  className={`px-4 py-2 flex items-center text-sm font-medium tracking-wide bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${
                    isScrolled ? "shadow-md" : "shadow-lg"
                  }`}
                >
                  Logout
                </button>
                <Link
                  to="/dashboard"
                  className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                    isScrolled
                      ? "w-8 h-8 bg-orange-100 border border-orange-200 hover:bg-orange-200"
                      : "w-9 h-9 bg-orange-50 border border-orange-100 hover:bg-orange-100"
                  }`}
                >
                  <User
                    className={`${
                      isScrolled ? "w-3.5 h-3.5" : "w-4 h-4"
                    } text-orange-600`}
                  />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-full ${
                isMobileMenuOpen
                  ? "bg-orange-100 text-orange-700"
                  : "text-orange-600 hover:text-orange-700 hover:bg-orange-100"
              } transition-all duration-200`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`absolute md:hidden w-full ${
              isScrolled ? "top-16" : "top-20"
            } left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-orange-100/50 shadow-lg rounded-b-xl px-6 pt-2 pb-6 space-y-1 transition-all duration-500`}
          >
            {[
              { to: "/stations", label: "Stations" },
              { to: "/saved-stations", label: "Saved Stations" },
              { to: "/map", label: "Map" },
              { to: "/dashboard", label: "Dashboard" },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-orange-700 hover:text-orange-900 hover:bg-orange-50 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}

            <div className="pt-2 mt-1 border-t border-orange-100">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="w-full px-4 py-3 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
