import { ArrowLeft, Home, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-midnight text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 bg-aurora pointer-events-none opacity-30" />

      <div className="text-center max-w-md mx-auto relative z-10 animate-slide-up">
        <div className="glass-panel p-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 border border-white/10 rounded-2xl mb-8">
            <Zap className="h-8 w-8 text-blue-500" />
          </div>

          <div className="text-7xl font-bold tracking-tighter mb-4">
            <span className="text-reflect-muted opacity-20">404</span>
          </div>

          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-reflect-muted mb-6 uppercase tracking-widest">
            <Sparkles className="h-3 w-3 mr-2 text-blue-500" />
            Lost in Space
          </div>

          <h1 className="text-2xl font-bold text-white mb-4">
            Page Not Found
          </h1>

          <p className="text-sm text-reflect-muted mb-10 leading-relaxed">
            The charging station or page you're looking for doesn't exist or may
            have been moved to a different coordinate.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Return Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
