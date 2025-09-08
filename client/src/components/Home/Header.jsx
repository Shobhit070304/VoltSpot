import { Sparkles } from "lucide-react";

const Header = () => (
    <div className="text-center mb-6">
        <div className="inline-flex items-center px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-[11px] font-medium mb-2">
            <Sparkles className="h-3 w-3 mr-1" />
            EV CHARGING NETWORK
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
            <span className="text-gray-900">Find Your Perfect </span>
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Charging Station
            </span>
        </h1>
        <p className="text-xs text-gray-600 max-w-xl mx-auto mb-2">
            Discover electric vehicle charging stations, search and explore with real-time info and simple filters.
        </p>
    </div>
);

export default Header;