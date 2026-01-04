import React from "react";
import {
  Wifi,
  Coffee,
  ShoppingBag,
  ParkingCircle,
  CircleUserRound,
  Sparkles,
} from "lucide-react";

const amenityIcons = {
  WiFi: <Wifi size={16} className="text-brand-primary" />,
  Cafe: <Coffee size={16} className="text-brand-secondary" />,
  Shopping: <ShoppingBag size={16} className="text-brand-accent" />,
  Restroom: <CircleUserRound size={16} className="text-emerald-400" />,
  Parking: <ParkingCircle size={16} className="text-brand-primary" />,
};

const AmenitiesCard = ({ amenities }) => {
  return (
    <div className="glass-panel p-8">
      <div className="flex items-center gap-2.5 mb-6">
        <Sparkles size={16} className="text-brand-primary" />
        <h2 className="text-base font-bold tracking-tight text-white">Amenities</h2>
      </div>

      {amenities && amenities.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="group-hover:scale-110 transition-transform">
                {amenityIcons[amenity] || <Sparkles size={14} className="text-reflect-muted" />}
              </div>
              <span className="text-[10px] font-bold text-reflect-muted uppercase tracking-widest group-hover:text-white transition-colors">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 text-center bg-white/5 border border-white/10 border-dashed rounded-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-reflect-muted">None listed</p>
        </div>
      )}
    </div>
  );
};

export default AmenitiesCard;
