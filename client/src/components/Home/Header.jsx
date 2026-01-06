import { Sparkles } from "lucide-react";

const Header = () => (
  <div className="mb-12 mt-4 animate-slide-up relative">
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[9px] font-bold text-brand-primary mb-5 uppercase tracking-[0.3em] shadow-2xl shadow-brand-primary/5">
      <Sparkles className="h-2.5 w-2.5 mr-2" />
      Premium Network
    </div>
    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-tight">
      Find your perfect <br />
      <span className="text-slate-500 opacity-40">charging station.</span>
    </h1>
    <p className="text-[13px] text-slate-500 max-w-xl leading-relaxed font-medium">
      Discover electric vehicle charging stations with real-time info and simple filters.
    </p>
  </div>
);

export default Header;
