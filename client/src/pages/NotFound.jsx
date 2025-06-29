import { Zap, Home, ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center p-4 relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[40rem] h-[40rem] bg-indigo-900/10 rounded-full blur-[120px] opacity-20 animate-float"></div>
        <div className="absolute bottom-[20%] right-[25%] w-[35rem] h-[35rem] bg-blue-900/10 rounded-full blur-[100px] opacity-15 animate-float-delay"></div>
      </div>

      <div className="text-center max-w-sm mx-auto relative z-10">
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 p-8 shadow-xl">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-800/50 rounded-lg mb-6 border border-gray-700/50">
            <Zap className="h-6 w-6 text-gray-400" />
          </div>

          <div className="text-5xl font-light text-gray-300 mb-4 tracking-tighter">
            404
          </div>

          <h1 className="text-xl font-light text-gray-200 mb-3 tracking-tight">
            Page Not Found
          </h1>

          <p className="text-xs text-gray-400 mb-6 leading-relaxed font-light tracking-wide">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <div className="space-y-3">
            <Link
              to="/"
              className="group inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-light tracking-wide text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <Home className="mr-2 h-3.5 w-3.5" />
              Return Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-gray-700 text-xs font-light tracking-wide text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-3.5 w-3.5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
