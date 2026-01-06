import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, Zap } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/stations", label: "Stations" },
    { to: "/map", label: "Map" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/saved-stations", label: "Saved" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
      <nav
        className={`max-w-5xl mx-auto pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
            ? "bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full px-6 py-2 shadow-2xl shadow-black/50"
            : "bg-transparent px-4 py-2"
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110">
                <Zap size={16} className="text-white fill-white" />
              </div>
            </div>
            <span className="text-lg font-bold tracking-tighter text-white">
              voltspot
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full hover:bg-white/5 ${location.pathname === link.to ? "text-white bg-white/5" : "text-slate-400 hover:text-white"
                  }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </Link>
            ))}

            <div className="h-4 w-px bg-white/10 mx-2" />

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/5"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn-primary">
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 mt-4 mx-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="glass-panel border-white/10 p-4 flex flex-col gap-2 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${location.pathname === link.to ? "bg-white/5 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px w-full bg-white/5 my-1" />
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/5 text-left"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center !py-3 !rounded-xl font-bold text-sm"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
