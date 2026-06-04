import { Github, Linkedin, Mail, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden border-t border-white/[0.03] bg-white/[0.01]">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <Zap className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-white">voltspot</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed mb-8 max-w-[200px]">
              The simple infrastructure for the next generation of
              electric mobility.
            </p>
          </div>

          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-white mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/stations" className="text-slate-400 hover:text-brand-primary transition-colors text-[11px]">Stations</Link></li>
              <li><Link to="/map" className="text-slate-400 hover:text-brand-primary transition-colors text-[11px]">Live Map</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-brand-primary transition-colors text-[11px]">Dashboard</Link></li>
              <li><Link to="/saved-stations" className="text-slate-400 hover:text-brand-primary transition-colors text-[11px]">Saved</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-white mb-6">Connect</h4>
            <div className="flex gap-3">
              {[
                {
                  icon: Github,
                  href: "https://github.com/Shobhit070304",
                  label: "GitHub"
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a/",
                  label: "LinkedIn"
                },
                {
                  icon: Mail,
                  href: "mailto:sharmashobhit1000@gmail.com",
                  label: "Email"
                }
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] text-slate-500 font-medium uppercase tracking-widest">
            © 2026 VoltSpot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
