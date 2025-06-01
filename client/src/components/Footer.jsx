import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6 border-t border-gray-300 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} VoltSpot | Charging Station Management. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="https://github.com/Shobhit070304" className="text-gray-400 hover:text-gray-500 transition-colors duration-150">
                  <Github />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a" className="text-gray-400 hover:text-gray-500 transition-colors duration-150">
                  <Linkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;