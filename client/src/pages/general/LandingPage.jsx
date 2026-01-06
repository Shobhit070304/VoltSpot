import { Link } from "react-router-dom";
import {
  Zap,
  ChevronRight,
  BarChart3,
  Layers,
  Search,
  Star,
  Bookmark,
  MapIcon,
  Shield,
  User,
} from "lucide-react";
import heroCover from "/C:/Users/Shobhit sharma/.gemini/antigravity/brain/afba9dfa-0750-4882-b6fe-14012d81c85a/voltspot_hero_cover_1767700389842.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-midnight text-slate-200 selection:bg-brand-primary/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid opacity-80 animate-move-grid" />
        <div className="absolute inset-0 grid-dots opacity-80 animate-move-grid [animation-duration:10s]" />

        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-secondary/10 blur-[100px] pointer-events-none animate-pulse-subtle" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">Simplifying EV Infrastructure</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-slide-up leading-[1.1]">
            Find your next <br />
            <span className="text-gradient">charge in seconds.</span>
          </h1>

          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto mb-10 animate-slide-up [animation-delay:0.1s] leading-relaxed">
            VoltSpot is the simple way to discover and manage charging stations.
            Built for the modern driver who values speed and reliability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:0.2s]">
            <Link to="/register" className="btn-primary group w-full sm:w-auto flex items-center justify-center">
              Get Started Free
              <ChevronRight className="inline-block ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/stations" className="btn-secondary w-full sm:w-auto flex items-center justify-center">
              Explore Network
            </Link>
          </div>

          {/* Hero Cover Image - Premium Mixed Visual */}
          <div className="mt-20 relative animate-slide-up [animation-delay:0.3s]">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 via-brand-secondary/20 to-brand-accent/20 rounded-2xl blur-2xl opacity-50" />
            <div className="glass-panel p-2 max-w-4xl mx-auto relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent z-10 opacity-60" />
              <img
                src={heroCover}
                alt="VoltSpot Hero"
                className="w-full h-auto rounded-lg shadow-2xl transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 z-20 text-left">
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white mb-2">
                  Live Network Status
                </div>
                <div className="text-white font-bold text-lg tracking-tight">85% Charged</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Driver Section - NEW */}
      <section className="py-24 px-6 relative overflow-hidden bg-white/[0.01]">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for the modern driver.</h2>
            <p className="text-muted text-sm max-w-lg mx-auto">Every tool you need to manage your EV lifestyle in one minimalist interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Search, title: "Smart Search", desc: "Find stations by location, speed, or connector type with our advanced filters." },
              { icon: Star, title: "Trusted Reviews", desc: "Real feedback from the EV community to help you choose the best charging spots." },
              { icon: Bookmark, title: "Saved Stations", desc: "Keep track of your favorite locations for quick access on your next trip." },
              { icon: MapIcon, title: "Live Map", desc: "Visualize all nearby charging points on an interactive, real-time map." },
              { icon: Shield, title: "Reliability Reports", desc: "Stay informed about station status and report issues to help others." },
              { icon: User, title: "User Dashboard", desc: "Manage your own stations, reviews, and account settings in one place." }
            ].map((feature, i) => (
              <div key={i} className="bento-card group hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all">
                  <feature.icon className="w-5 h-5 text-slate-400 group-hover:text-brand-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-muted text-[13px] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Simplified */}
      <section className="py-16 px-6 relative border-y border-white/[0.03]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Stations", value: "2,400+" },
            { label: "Users", value: "15k+" },
            { label: "Cities", value: "42+" },
            { label: "Uptime", value: "99.9%" }
          ].map((stat, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section - Bento Grid Scaled Down */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Everything you need.</h2>
            <p className="text-muted text-sm max-w-lg mx-auto">Simple tools to keep you moving without the clutter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bento-card group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-24 h-24 text-brand-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-4 h-4 text-brand-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Precision Mapping</h3>
                <p className="text-muted text-sm leading-relaxed max-w-sm">
                  Find the exact location of any charging point with real-time status updates.
                </p>
              </div>
            </div>

            <div className="bento-card group">
              <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-4 h-4 text-brand-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2">Smart Analytics</h3>
              <p className="text-muted text-sm leading-relaxed">
                Track your usage and optimize your charging schedule effortlessly.
              </p>
            </div>

            <div className="bento-card group">
              <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center mb-4">
                <Layers className="w-4 h-4 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Verified Data</h3>
              <p className="text-muted text-sm leading-relaxed">
                Community-driven insights ensure you always have accurate info.
              </p>
            </div>

            <div className="md:col-span-2 bento-card group flex items-center justify-between">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Ready to start?</h3>
                <p className="text-muted text-sm">Join thousands of drivers today.</p>
              </div>
              <Link to="/register" className="btn-primary">Sign Up Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Scaled Down */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10 animate-move-grid" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Power up your journey.</h2>
              <p className="text-muted text-base mb-10 max-w-xl mx-auto">
                Experience the future of EV charging with VoltSpot.
                Simple, fast, and reliable.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="btn-primary w-full sm:w-auto flex items-center justify-center">Get Started Free</Link>
                <Link to="/stations" className="btn-secondary w-full sm:w-auto flex items-center justify-center">View All Features</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
