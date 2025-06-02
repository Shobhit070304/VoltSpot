import React from 'react';
import { Link } from 'react-router-dom';
import { BatteryCharging as ChargingPile } from 'lucide-react';

const NotFound = () => {
  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  //     <div className="max-w-md w-full space-y-8 text-center">
  //       <div>
  //         <ChargingPile className="mx-auto h-16 w-16 text-blue-500" />
  //         <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
  //           Page Not Found
  //         </h2>
  //         <p className="mt-2 text-sm text-gray-600">
  //           The page you're looking for doesn't exist or has been moved.
  //         </p>
  //       </div>
  //       <div>
  //         <Link
  //           to="/"
  //           className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //         >
  //           Go back home
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );



  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden flex items-center justify-center">
      {/* Background glow effects - matching landing page */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-900/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-900/20 rounded-full filter blur-[100px]"></div>
      </div>
  
      {/* Content */}
      <div className="max-w-md w-full space-y-8 text-center relative z-10 px-6 py-12">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-10 shadow-lg">
          <div>
            <ChargingPile className="mx-auto h-16 w-16 text-blue-400" />
            <h2 className="mt-6 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Page Not Found
            </h2>
            <p className="mt-2 text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;