import React from "react";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-950 backdrop-blur-lg border-t border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright text with subtle gradient */}
          <p className="text-gray-400 text-xs font-light tracking-wide">
            &copy; {new Date().getFullYear()}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 font-medium">
              VoltSpot
            </span>{" "}
            | Charging Station Management. All rights reserved.
          </p>

          {/* Social links with glass effect */}
          <div className="mt-4 md:mt-0 flex space-x-3">
            <a
              href="https://github.com/Shobhit070304"
              className="text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-gray-800/20 hover:border-gray-700/50"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a"
              className="text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-gray-800/20 hover:border-gray-700/50"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Additional footer links (optional) */}
        <div className="mt-6 pt-6 border-t border-gray-800/20 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-6">
          <Link
            to=""
            className="text-xs font-light tracking-wide text-gray-500 hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to=""
            className="text-xs font-light tracking-wide text-gray-500 hover:text-gray-300 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to=""
            className="text-xs font-light tracking-wide text-gray-500 hover:text-gray-300 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
