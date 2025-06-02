import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 font-medium">VoltSpot</span> | Charging Station Management. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a 
              href="https://github.com/Shobhit070304" 
              className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-gray-800/50"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a" 
              className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-gray-800/50"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;