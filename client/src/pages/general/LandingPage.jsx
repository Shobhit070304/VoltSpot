import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  ArrowRight,
  Star,
  Search,
  Bookmark,
  User,
  MapIcon,
  Sparkles,
  Globe,
  Smartphone,
  Cpu,
  Layout,
  Activity,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-midnight text-white overflow-x-hidden relative">
      {/* Hero Section with Grid Background */}
      <section className="relative pt-40 pb-24 px-8 overflow-hidden">
        {/* Grid Pattern - Only for Hero */}
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-brand-primary/10 blur-[160px] pointer-events-none" />
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-secondary/10 blur-[140px] pointer-events-none animate-pulse-subtle" />
        <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-brand-accent/10 blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-8 shadow-2xl shadow-brand-accent/10">
            <Sparkles className="h-3 w-3" />
            The future of EV charging
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1] lg:px-20">
            Find your next charge <br className="hidden md:block" />
            <span className="text-gradient">with absolute ease.</span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed font-medium">
            VoltSpot is the premium platform to discover, review, and manage EV charging infrastructure.
            Join the global network making electric mobility seamless.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to="/register" className="btn-primary flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest px-8 py-3.5 w-full sm:w-auto !rounded-full">
              Get started
              <ArrowRight size={14} />
            </Link>
            <Link to="/stations" className="btn-secondary text-[11px] font-bold uppercase tracking-widest px-8 py-3.5 w-full sm:w-auto !rounded-full">
              Explore network
            </Link>
          </div>

          {/* Floating Dashboard Preview */}
          <div className="relative max-w-4xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
            <div className="relative glass-panel border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-white/5 border-b border-white/5 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                </div>
                <div className="h-4 w-px bg-white/10 mx-2" />
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">voltspot.app / dashboard</div>
              </div>
              <div className="p-6 grid grid-cols-12 gap-4 bg-midnight/50">
                <div className="col-span-3 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 bg-white/5 rounded-lg border border-white/5" />
                  ))}
                </div>
                <div className="col-span-9 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-white/5 rounded-xl border border-white/5 p-3">
                        <div className="w-6 h-6 rounded-lg bg-brand-primary/10 mb-2" />
                        <div className="h-2 w-12 bg-white/10 rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="h-40 bg-white/5 rounded-xl border border-white/5 p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-10" />
                    <div className="relative h-full w-full flex items-end gap-2">
                      {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-brand-primary/20 border-t border-brand-primary/40 rounded-t-sm" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-8 relative border-y border-white/5 bg-white/[0.01] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Active Stations", value: "50k+", color: "text-brand-primary" },
            { label: "Happy Drivers", value: "120k+", color: "text-brand-secondary" },
            { label: "Countries", value: "45+", color: "text-brand-accent" },
            { label: "Monthly Charges", value: "1M+", color: "text-brand-primary" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <p className={`text-2xl md:text-3xl font-bold tracking-tighter mb-1 transition-transform group-hover:scale-110 duration-500 ${stat.color}`}>{stat.value}</p>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Built for the modern driver.</h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto font-medium">Every tool you need to manage your EV lifestyle in one minimalist interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Search className="text-brand-primary" size={20} />,
                title: "Smart Search",
                description: "Find stations by location, speed, or connector type with our advanced filters."
              },
              {
                icon: <Star className="text-brand-secondary" size={20} />,
                title: "Trusted Reviews",
                description: "Real feedback from the EV community to help you choose the best charging spots."
              },
              {
                icon: <Bookmark className="text-brand-accent" size={20} />,
                title: "Saved Stations",
                description: "Keep track of your favorite locations for quick access on your next trip."
              },
              {
                icon: <MapIcon className="text-brand-primary" size={20} />,
                title: "Live Map",
                description: "Visualize all nearby charging points on an interactive, real-time map."
              },
              {
                icon: <Shield className="text-brand-secondary" size={20} />,
                title: "Reliability Reports",
                description: "Stay informed about station status and report issues to help others."
              },
              {
                icon: <User className="text-brand-accent" size={20} />,
                title: "User Dashboard",
                description: "Manage your own stations, reviews, and account settings in one place."
              }
            ].map((feature, i) => (
              <div key={i} className="glass-panel p-8 hover:bg-white/[0.03] transition-all duration-500 group border-white/5 hover:border-brand-primary/20">
                <div className="mb-6 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 group-hover:bg-brand-primary/10 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-brand-primary transition-colors">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-8 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-5" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Simple by design.</h2>
              <div className="space-y-8">
                {[
                  { icon: <Globe size={18} />, title: "Discover", text: "Browse our global network of verified charging stations.", color: "text-brand-primary" },
                  { icon: <Smartphone size={18} />, title: "Navigate", text: "Get real-time directions and status updates on the go.", color: "text-brand-secondary" },
                  { icon: <Cpu size={18} />, title: "Manage", text: "Track your charging history and manage your own infrastructure.", color: "text-brand-accent" },
                ].map((step, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${step.color}`}>
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold mb-1.5 tracking-tight">{step.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-primary/20 blur-[120px] rounded-full group-hover:bg-brand-secondary/20 transition-colors duration-1000" />
              <div className="relative glass-panel aspect-video flex items-center justify-center border-white/10 overflow-hidden group-hover:border-white/20 transition-all duration-500">
                <div className="p-10 text-center animate-float">
                  <Zap size={48} className="text-brand-accent mx-auto mb-6 animate-pulse" />
                  <p className="text-xl font-bold tracking-tighter">Interactive Experience</p>
                  <p className="text-xs text-slate-400 mt-3 font-medium">Visualizing the future of energy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 relative">
        <div className="max-w-4xl mx-auto glass-panel p-16 md:p-24 text-center relative overflow-hidden border-white/10">
          <div className="absolute inset-0 bg-brand-gradient opacity-10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-secondary/20 blur-[100px] rounded-full" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">
              Ready to simplify <br /> your experience?
            </h2>
            <Link to="/register" className="btn-primary text-[13px] font-bold uppercase tracking-widest px-10 py-4 inline-flex items-center gap-3 !rounded-full">
              Get started now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
