import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-20 bg-midnight border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora pointer-events-none opacity-10" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-blue-400 transition-colors">
                voltspot
              </span>
            </Link>
            <p className="text-sm text-reflect-muted max-w-xs leading-relaxed">
              The simplest way to discover, review, and manage EV charging infrastructure.
              Join the community making electric mobility accessible to everyone.
            </p>
            <div className="flex gap-5">
              <a
                href="https://github.com/Shobhit070304"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-reflect-muted hover:text-white hover:border-blue-500/50 transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-reflect-muted hover:text-white hover:border-blue-500/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/stations" className="text-sm text-reflect-muted hover:text-white transition-colors">Stations</Link></li>
              <li><Link to="/map" className="text-sm text-reflect-muted hover:text-white transition-colors">Live Map</Link></li>
              <li><Link to="/dashboard" className="text-sm text-reflect-muted hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/saved-stations" className="text-sm text-reflect-muted hover:text-white transition-colors">Saved</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><button className="text-sm text-reflect-muted hover:text-white transition-colors">About Us</button></li>
              <li><button className="text-sm text-reflect-muted hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="text-sm text-reflect-muted hover:text-white transition-colors">Terms of Service</button></li>
              <li><button className="text-sm text-reflect-muted hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-medium text-reflect-muted uppercase tracking-widest">
            &copy; {new Date().getFullYear()} VoltSpot. Built for the future.
          </p>
          <div className="flex gap-8">
            <button className="text-[11px] font-medium text-reflect-muted hover:text-white uppercase tracking-widest transition-colors">Status</button>
            <button className="text-[11px] font-medium text-reflect-muted hover:text-white uppercase tracking-widest transition-colors">Security</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
