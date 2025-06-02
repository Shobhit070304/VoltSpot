// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { BatteryCharging as ChargingPile, LogOut } from 'lucide-react';
// import logo from '../assets/charging.png';
// const Navbar = () => {
//   const { isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="fixed w-full top-0 z-50 bg-gray-900/50 border-b border-gray-800/30 backdrop-blur-lg transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <img src={logo} alt="logo" className="h-8 w-8" />
//               <span className="ml-2 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
//                 VoltSpot
//               </span>
//             </Link>
//           </div>

//           {/* Navigation Links */}
//           <div className='flex items-center gap-2'>
//             <Link
//               to="/home"
//               className='px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-gray-800/50 transition-all duration-200'>
//               Charging Stations
//             </Link>
//             {isAuthenticated && (
//               <>
//                 <Link
//                   to="/map"
//                   className='px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-gray-800/50 transition-all duration-200'>
//                   Maps
//                 </Link>
//                 <Link
//                   to="/dashboard"
//                   className='px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-gray-800/50 transition-all duration-200'>
//                   Dashboard
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Auth Buttons */}
//           <div className="flex items-center gap-3">
//             {!isAuthenticated ? (
//               <Link
//                 to="/login"
//                 className="px-4 py-2 flex items-center text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Login
//               </Link>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 flex items-center text-sm font-medium bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-500 hover:to-pink-500 transition-all duration-300 shadow-lg"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BatteryCharging as ChargingPile, LogOut, Menu, X } from 'lucide-react';
import logo from '../assets/charging.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false); // close mobile menu on logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-gray-900/50 border-b border-gray-800/30 backdrop-blur-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={logo} alt="logo" className="h-8 w-8" />
              <span className="ml-2 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                VoltSpot
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/home"
              className='px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-gray-800/50 transition-all duration-200'>
              Charging Stations
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/map"
                  className='px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-gray-800/50 transition-all duration-200'>
                  Maps
                </Link>
                <Link
                  to="/dashboard"
                  className='px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-gray-800/50 transition-all duration-200'>
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-4 py-2 flex items-center text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 flex items-center text-sm font-medium bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-500 hover:to-pink-500 transition-all duration-300 shadow-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            )}
          </div>

          {/* Hamburger Button (Mobile) */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <Link
              to="/home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md"
            >
              Charging Stations
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/map"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md"
                >
                  Maps
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md"
                >
                  Dashboard
                </Link>
              </>
            )}
            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-center shadow-lg"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-center shadow-lg"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
