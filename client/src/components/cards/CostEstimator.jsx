import React, { useState } from "react";
import { Calculator, Battery, Clock, Zap } from "lucide-react";

const CostEstimator = ({ station }) => {
  const [batteryCapacity, setBatteryCapacity] = useState(60);
  const [currentCharge, setCurrentCharge] = useState(20);
  const [targetCharge, setTargetCharge] = useState(80);

  const energyNeeded = Math.max(0, (batteryCapacity * (targetCharge - currentCharge)) / 100);
  const price = station?.price ?? 15; // Default price if missing
  const power = station?.powerOutput || 50; // Default power if missing or 0

  const estimatedCost = energyNeeded * price;
  const estimatedTime = (energyNeeded / power) * 60;

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Battery Capacity</label>
            <span className="text-[10px] font-bold text-white">{batteryCapacity} kWh</span>
          </div>
          <input
            type="range"
            min="20"
            max="120"
            value={batteryCapacity}
            onChange={(e) => setBatteryCapacity(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Current Charge</label>
            <span className="text-[10px] font-bold text-white">{currentCharge}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={currentCharge}
            onChange={(e) => setCurrentCharge(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Target Charge</label>
            <span className="text-[10px] font-bold text-white">{targetCharge}%</span>
          </div>
          <input
            type="range"
            min={currentCharge}
            max="100"
            value={targetCharge}
            onChange={(e) => setTargetCharge(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/5">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Est. Cost</p>
          <p className="text-base font-bold text-white">₹ {estimatedCost.toFixed(0)}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Est. Time</p>
          <p className="text-base font-bold text-white">{estimatedTime.toFixed(0)} min</p>
        </div>
      </div>

      <p className="text-[9px] text-slate-500 font-medium italic text-center opacity-50">
        * Estimates based on station power and price.
      </p>
    </div>
  );
};

export default CostEstimator;
