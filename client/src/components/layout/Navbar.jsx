import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X } from "lucide-react";
import logo from "/charging.png";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "py-3 bg-midnight/80 backdrop-blur-xl border-b border-white/5"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            <img
              src={logo}
              alt="VoltSpot"
              className="w-7 h-7 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>
          <span className="text-lg font-bold tracking-tighter text-white group-hover:text-brand-primary transition-colors duration-500">
            voltspot
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all duration-300 group/link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary transition-all duration-300 group-hover/link:w-full" />
            </Link>
          ))}

          <div className="h-4 w-px bg-white/10 mx-1" />

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-primary !py-2 !px-5 !rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/20">
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-midnight/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-500 ease-in-out overflow-hidden ${isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="p-8 flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px w-full bg-white/5" />
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="text-lg font-bold text-slate-400 text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary text-center !py-4 !rounded-2xl font-bold text-lg"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
