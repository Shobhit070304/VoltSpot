import { ArrowLeft, Home, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-midnight text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-80 animate-move-grid" />
      <div className="absolute inset-0 grid-dots opacity-80 animate-move-grid [animation-duration:10s]" />

      {/* Aurora Background Effect */}
      <div className="fixed inset-0 bg-aurora pointer-events-none opacity-20" />

      <div className="text-center max-w-md mx-auto relative z-10 animate-slide-up">
        <div className="glass-panel p-12 border-white/5">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-2xl mb-8 shadow-2xl">
            <Zap className="h-6 w-6 text-brand-primary" />
          </div>

          <div className="text-8xl font-bold tracking-tighter mb-4">
            <span className="text-slate-500 opacity-10">404</span>
          </div>

          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-slate-500 mb-6 uppercase tracking-[0.2em]">
            <Sparkles className="h-2.5 w-2.5 mr-2 text-brand-primary" />
            Lost in Space
          </div>

          <h1 className="text-xl font-bold text-white mb-3 tracking-tight">
            Page Not Found
          </h1>

          <p className="text-[13px] text-slate-500 mb-10 leading-relaxed font-medium">
            The charging station or page you're looking for doesn't exist or may
            have been moved to a different coordinate.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="btn-primary w-full flex items-center justify-center gap-2 !rounded-full py-3 text-[11px] font-bold uppercase tracking-widest"
            >
              <Home size={14} />
              Return Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn-secondary w-full flex items-center justify-center gap-2 !rounded-full py-3 text-[11px] font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={14} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
