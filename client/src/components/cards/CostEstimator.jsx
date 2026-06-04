import React, { useState, useEffect } from "react";
import { Calculator, Battery, Clock, Zap, Loader2 } from "lucide-react";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const CostEstimator = ({ station }) => {
  const [evs, setEvs] = useState([]);
  const [selectedEvId, setSelectedEvId] = useState("");
  const [customBatteryCapacity, setCustomBatteryCapacity] = useState(60);
  const [currentCharge, setCurrentCharge] = useState(20);
  const [targetCharge, setTargetCharge] = useState(80);
  
  const [result, setResult] = useState(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);

  // Fetch EV list from backend
  useEffect(() => {
    const fetchEvs = async () => {
      try {
        const res = await api.get("/cars");
        const carsList = res.data.data?.cars || [];
        setEvs(carsList);
        if (carsList.length > 0) {
          setSelectedEvId(carsList[0]._id);
        } else {
          setSelectedEvId("custom");
        }
      } catch (error) {
        setSelectedEvId("custom");
      }
    };
    fetchEvs();
  }, []);

  const isCustom = selectedEvId === "custom" || evs.length === 0;

  const handleCalculate = async () => {
    // Validation checks
    if (currentCharge < 0 || currentCharge > 100) {
      toast.error("Current charge must be between 0% and 100%");
      return;
    }
    if (targetCharge < 0 || targetCharge > 100) {
      toast.error("Target charge must be between 0% and 100%");
      return;
    }
    if (targetCharge <= currentCharge) {
      toast.error("Target charge must be greater than current charge");
      return;
    }

    if (isCustom) {
      if (customBatteryCapacity <= 0) {
        toast.error("Battery capacity must be greater than 0");
        return;
      }
      // Local calculation
      const energyNeeded = (customBatteryCapacity * (targetCharge - currentCharge)) / 100;
      const price = station?.price ?? 15;
      const power = station?.powerOutput || 50;

      const cost = energyNeeded * price;
      const time = (energyNeeded / power) * 60;

      setResult({
        cost: cost.toFixed(0),
        time: time.toFixed(0),
        isServer: false,
      });
    } else {
      try {
        setLoadingEstimate(true);
        const res = await api.post("/stations/estimate", {
          stationPower: station?.powerOutput || 50,
          pricePerKWh: station?.price || 15,
          evId: selectedEvId,
          chargeFrom: currentCharge,
          chargeTo: targetCharge,
        });
        
        setResult({
          cost: parseFloat(res.data.data.cost).toFixed(0),
          time: res.data.data.time,
          isServer: true,
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to calculate estimate");
      } finally {
        setLoadingEstimate(false);
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* EV Selector */}
      <div className="space-y-1.5">
        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Select EV Model</label>
        <select
          value={selectedEvId}
          onChange={(e) => {
            setSelectedEvId(e.target.value);
            setResult(null); // Clear previous results
          }}
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-primary transition-colors cursor-pointer font-medium"
        >
          {evs.map((ev) => (
            <option key={ev._id} value={ev._id} className="bg-midnight">
              {ev.manufacturer} {ev.name} ({ev.batterySize} kWh)
            </option>
          ))}
          <option value="custom" className="bg-midnight">Custom Capacity (Manual Input)</option>
        </select>
      </div>

      <div className="space-y-3">
        {/* Custom Battery Input (if selected) */}
        {isCustom && (
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Battery Capacity (kWh)</label>
            <input
              type="number"
              min="10"
              max="200"
              value={customBatteryCapacity}
              onChange={(e) => {
                setCustomBatteryCapacity(Number(e.target.value));
                setResult(null);
              }}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-primary transition-colors font-medium"
              placeholder="e.g. 60"
            />
          </div>
        )}

        {/* Current Charge Input */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Current Charge (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={currentCharge}
            onChange={(e) => {
              setCurrentCharge(Number(e.target.value));
              setResult(null);
            }}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-primary transition-colors font-medium"
            placeholder="e.g. 20"
          />
        </div>

        {/* Target Charge Input */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Target Charge (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={targetCharge}
            onChange={(e) => {
              setTargetCharge(Number(e.target.value));
              setResult(null);
            }}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-primary transition-colors font-medium"
            placeholder="e.g. 80"
          />
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={loadingEstimate}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3 !rounded-xl font-bold text-[10px] uppercase tracking-widest transition-transform active:scale-[0.98]"
      >
        <Calculator size={14} />
        {loadingEstimate ? "Calculating..." : "Calculate Cost"}
      </button>

      {/* Results Display */}
      <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/5 relative">
        {loadingEstimate && (
          <div className="absolute inset-0 flex items-center justify-center bg-midnight/30 backdrop-blur-[1px] z-10 rounded-xl">
            <Loader2 className="h-5 w-5 animate-spin text-brand-primary" />
          </div>
        )}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Est. Cost</p>
          <p className="text-base font-bold text-white">
            {result ? `₹ ${result.cost}` : "₹ --"}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Est. Time</p>
          <p className="text-base font-bold text-white">
            {result ? `${result.time} min` : "-- min"}
          </p>
        </div>
      </div>

      {result && (
        <p className="text-[9px] text-slate-500 font-medium italic text-center opacity-50">
          {result.isServer
            ? "* Database estimates calculated on server."
            : "* Estimates calculated locally based on custom battery size."}
        </p>
      )}
    </div>
  );
};

export default CostEstimator;
