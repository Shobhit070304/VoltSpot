import { useState, useEffect, useMemo } from "react";
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
  Plus,
} from "lucide-react";
import { api } from "../../services/api";
import heroCover from "/hero-banner.png";

const LandingPage = () => {
  const [stats, setStats] = useState({
    chargingPoints: 200,
    activeStations: 69,
    citiesCovered: 20,
    userReviews: 300,
  });

  const [car, setCar] = useState("nexon");
  const [startCharge, setStartCharge] = useState(20);
  const [endCharge, setEndCharge] = useState(80);
  const [activeFaq, setActiveFaq] = useState(null);

  const carDatabase = {
    nexon: { name: "Tata Nexon EV Max", battery: 40.5, chargingSpeed: 50, logo: "⚡" },
    ioniq: { name: "Hyundai Ioniq 5", battery: 77.4, chargingSpeed: 150, logo: "⚡" },
    model3: { name: "Tesla Model 3 Long Range", battery: 75.0, chargingSpeed: 120, logo: "⚡" },
    zsev: { name: "MG ZS EV", battery: 50.3, chargingSpeed: 50, logo: "⚡" }
  };

  const estimation = useMemo(() => {
    const selected = carDatabase[car];
    const energyNeeded = ((endCharge - startCharge) / 100) * selected.battery;
    const avgPricePerKWh = 15;
    const cost = energyNeeded * avgPricePerKWh;
    const chargerPower = Math.min(selected.chargingSpeed, 50);
    const timeHours = energyNeeded / chargerPower;
    const timeMins = Math.round(timeHours * 60);

    return {
      energy: energyNeeded.toFixed(1),
      cost: Math.round(cost),
      time: timeMins
    };
  }, [car, startCharge, endCharge]);

  useEffect(() => {
    const fetchLandingStats = async () => {
      try {
        const response = await api.get("/stations/landing-stats");
        if (response.status === 200) {
          const data = response.data.data;
          setStats({
            chargingPoints: data.chargingPoints || 200,
            activeStations: data.activeStations || 69,
            citiesCovered: data.citiesCovered || 20,
            userReviews: data.userReviews || 300,
          });
        }
      } catch (error) {
        console.error("Error fetching landing stats:", error);
      }
    };
    fetchLandingStats();
  }, []);

  return (
    <div className="min-h-screen bg-midnight text-slate-200 selection:bg-brand-primary/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid opacity-90 animate-move-grid" />
        <div className="absolute inset-0 grid-dots opacity-90 animate-move-grid [animation-duration:10s]" />

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

      {/* Stats Section - Simplified */}
      <section className="py-16 px-6 relative border-y border-white/[0.03]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Charging Points", value: `${stats.chargingPoints}+` },
            { label: "Active Stations", value: `${stats.activeStations}+` },
            { label: "Cities Covered", value: `${stats.citiesCovered}+` },
            { label: "User Reviews", value: `${stats.userReviews}+` }
          ].map((stat, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 relative bg-white/[0.01] border-b border-white/[0.03]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
              <span className="text-[9px] uppercase tracking-widest font-bold text-brand-primary">Process Guide</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works.</h2>
            <p className="text-muted text-sm max-w-lg mx-auto">Get charged up in three easy steps with our community-centric EV utility hub.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { step: "01", title: "Locate Charging Hubs", desc: "Filter by connector type and use proximity radius queries to map nearby stations." },
              { step: "02", title: "Calculate Charge Session", desc: "Use our vehicle cost estimator to compute energy demands, prices, and charging times." },
              { step: "03", title: "Navigate & Charge", desc: "Confirm socket availability in real-time via WebSockets and start your charging session." }
            ].map((item, idx) => (
              <div key={idx} className="glass-panel p-8 relative overflow-hidden group hover:border-brand-primary/20 transition-all duration-300">
                <div className="text-4xl font-extrabold text-brand-primary/10 group-hover:text-brand-primary/20 transition-colors mb-4">{item.step}</div>
                <h3 className="text-lg font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-muted text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
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

      {/* Interactive Estimator Preview Section */}
      <section className="py-24 px-6 relative border-y border-white/[0.03] overflow-hidden bg-white/[0.02]">
        {/* Glow behind section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-primary/5 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20">
              <span className="text-[9px] uppercase tracking-widest font-bold text-brand-accent">Interactive Calculator</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Estimate your session <span className="text-gradient">instantly.</span>
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              Wondering how long it takes to charge from 20% to 80%? Select your EV model and slide the battery values to preview the energy demand, duration, and pricing calculated in real-time.
            </p>
            <div className="pt-4">
              <Link to="/register" className="btn-primary">Try Full Estimator Free</Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-panel p-6 border-white/10 shadow-2xl relative">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Charging Simulator Preview</h3>
              
              <div className="space-y-6">
                {/* Select Vehicle */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Electric Vehicle</label>
                  <select 
                    value={car} 
                    onChange={(e) => setCar(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-brand-accent transition-colors font-medium"
                  >
                    <option value="nexon" className="bg-midnight">Tata Nexon EV Max (40.5 kWh)</option>
                    <option value="ioniq" className="bg-midnight">Hyundai Ioniq 5 (77.4 kWh)</option>
                    <option value="model3" className="bg-midnight">Tesla Model 3 LR (75.0 kWh)</option>
                    <option value="zsev" className="bg-midnight">MG ZS EV (50.3 kWh)</option>
                  </select>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Start Charge</label>
                      <span className="text-xs font-bold text-white">{startCharge}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="79" 
                      value={startCharge} 
                      onChange={(e) => setStartCharge(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Charge</label>
                      <span className="text-xs font-bold text-white">{endCharge}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="80" 
                      max="100" 
                      value={endCharge} 
                      onChange={(e) => setEndCharge(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                    />
                  </div>
                </div>

                {/* Results block */}
                <div className="grid grid-cols-3 gap-3.5 pt-6 border-t border-white/5 text-center">
                  <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Energy Needed</div>
                    <div className="text-lg font-bold text-white">{estimation.energy} kWh</div>
                  </div>
                  <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Time (Est)</div>
                    <div className="text-lg font-bold text-white">{estimation.time} mins</div>
                  </div>
                  <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Cost</div>
                    <div className="text-lg font-bold text-brand-accent">₹ {estimation.cost}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid Scaled Down */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Built for real-world EV needs.
            </h2>
            <p className="text-muted text-sm max-w-lg mx-auto">
              A complete EV charging platform designed with usability, performance, and community in mind.
            </p>
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
                <h3 className="text-lg font-bold mb-2">Smart Station Finder</h3>
                <p className="text-muted text-sm leading-relaxed max-w-sm">
                  Discover nearby EV charging stations with accurate location data and live availability status.
                </p>
              </div>
            </div>

            <div className="bento-card group">
              <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-4 h-4 text-brand-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2">Cost & Time Estimation</h3>
              <p className="text-muted text-sm leading-relaxed">
                Estimate charging cost and time based on your EV model, battery level, and station power.
              </p>
            </div>

            <div className="bento-card group">
              <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center mb-4">
                <Layers className="w-4 h-4 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Community-Powered Data</h3>
              <p className="text-muted text-sm leading-relaxed">
                Ratings, reviews, and issue reports help keep station information reliable and up to date.
              </p>
            </div>

            <div className="md:col-span-2 bento-card group flex items-center justify-between">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Explore Voltspot</h3>
                <p className="text-muted text-sm">
                  Built as a full-stack project to solve real EV charging challenges.
                </p>
              </div>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Accordion Section */}
      <section className="py-24 px-6 relative border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted text-sm max-w-lg mx-auto">Everything you need to know about the VoltSpot EV charging network companion.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "How accurate is the live availability status?", a: "Extremely accurate. VoltSpot integrates a real-time WebSocket connection to the server. Whenever a station's status changes (e.g. going offline or starting a charge session), the state updates instantly on the map and station lists of all active users." },
              { q: "How does the Proximity and Radius Search work?", a: "By enabling 'Sort by Distance', VoltSpot requests secure browser location coordinates and queries the backend using MongoDB's geospatial 2dsphere index. This returns nearby stations sorted by geographical proximity within your chosen radius (10km to 500km)." },
              { q: "Does VoltSpot support cost estimations for all EVs?", a: "Yes! The platform has an auto-seeded database of popular EV models (such as Tesla, Hyundai, Tata, and MG). It calculates energy requirements, cost (based on actual local tariff slabs), and time to charge depending on the station's max power output." },
              { q: "Can I add, edit, or report issues on charging stations?", a: "Absolutely. Once registered, users gain full dashboard management capabilities. You can add new charging points, write reviews, calculate custom charge session plans, and report broken or offline connectors to notify the community." }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="glass-panel overflow-hidden border-white/5 hover:border-white/10 transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  <span className={`text-slate-400 transform transition-transform duration-300 ${activeFaq === idx ? "rotate-45" : ""}`}>
                    <Plus size={16} />
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === idx ? "max-h-40 border-t border-white/5" : "max-h-0"}`}
                >
                  <p className="px-6 py-5 text-[13px] text-slate-400 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
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
