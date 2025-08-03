import React from "react";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 bg-gradient-to-br from-orange-100 to-amber-100 border-t border-orange-200/40 text-[0.95rem]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright text with subtle gradient */}
          <p className="text-orange-500 text-xs font-medium tracking-wide">
            &copy; {new Date().getFullYear()} <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400 font-bold">VoltSpot</span> | Charging Station Management. All rights reserved.
          </p>
          {/* Social links with glass effect */}
          <div className="flex space-x-3">
            <a
              href="https://github.com/Shobhit070304"
              className="text-orange-400 hover:text-orange-600 transition-all duration-300 p-2 rounded-lg hover:bg-orange-200/50 border border-orange-200/40"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a"
              className="text-orange-400 hover:text-orange-600 transition-all duration-300 p-2 rounded-lg hover:bg-orange-200/50 border border-orange-200/40"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
