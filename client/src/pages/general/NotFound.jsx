import { ArrowLeft, Home, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 text-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
        <div className="absolute top-[50%] left-[50%] w-[18rem] h-[18rem] bg-yellow-200/20 rounded-full blur-[60px] opacity-30 animate-pulse"></div>
      </div>

      <div className="text-center max-w-sm mx-auto relative z-10">
        <div className="bg-white/90 rounded-2xl border border-orange-100 p-8 shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl mb-6">
            <Zap className="h-6 w-6 text-orange-500" />
          </div>

          <div className="text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              404
            </span>
          </div>

          <h1 className="text-xl font-semibold text-gray-900 mb-3">
            Page Not Found
          </h1>

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            The charging station or page you're looking for doesn't exist or may
            have been moved.
          </p>

          <div className="space-y-3">
            <Link
              to="/"
              className="group w-full inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-medium tracking-wide text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl border border-orange-200 text-sm font-medium tracking-wide text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
