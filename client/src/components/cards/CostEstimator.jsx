import { useEffect, useState } from "react";
import { api } from "../../services/api";
import toast from "react-hot-toast";

export default function CostEstimator({ station }) {
  const [stationPower, setStationPower] = useState(station?.powerOutput || 0); // kW
  const [pricePerKWh, setPricePerKWh] = useState(station?.price || 0); // ₹ per kWh
  const [evId, setEvId] = useState("tesla_model3");
  const [chargeFrom, setChargeFrom] = useState(20);
  const [chargeTo, setChargeTo] = useState(80);
  const [result, setResult] = useState(null);
  const [evs, setEVs] = useState([]);


  const handleEstimate = async () => {
    try {
      // Info object removed for production
      const res = await api.post("/station/estimate", {
        stationPower,
        pricePerKWh,
        evId,
        chargeFrom,
        chargeTo,
      });
      setResult(res.data);
    } catch (err) {
      setError("Failed to calculate estimate. Please try again.");
    }
  };

  useEffect(() => {
    const fetchEVs = async () => {
      try {
        const res = await api.get("/car/evs");
        setEVs(res.data);
      } catch (error) {
        setError("Failed to load electric vehicles");
      }
    };
    fetchEVs();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-2xl max-w-md mx-auto mt-[7%]">
      <h2 className="text-xl font-bold mb-4">⚡ EV Charging Cost Estimator</h2>

      <label className="block mb-2 font-medium">Select EV</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={evId}
        onChange={(e) => setEvId(e.target.value)}
      >
        {evs.map((car) => (
          <option key={car._id} value={car._id}>
            {car.name} ({car.batterySize} kWh)
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Station Power (kW)</label>
      <input
        type="number"
        value={stationPower}
        readOnly
        onChange={(e) => setStationPower(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 font-medium">Price per kWh (₹)</label>
      <input
        type="number"
        value={pricePerKWh}
        readOnly
        onChange={(e) => setPricePerKWh(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <label className="block mb-2 font-medium">From (%)</label>
          <input
            type="number"
            value={chargeFrom}
            onChange={(e) => setChargeFrom(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 font-medium">To (%)</label>
          <input
            type="number"
            value={chargeTo}
            onChange={(e) => setChargeTo(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        onClick={handleEstimate}
        className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600"
      >
        Estimate Cost & Time
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <p>
            <b>EV:</b> {result.ev}
          </p>
          <p>
            <b>Energy Needed:</b> {result.energyNeeded} kWh
          </p>
          <p>
            <b>Estimated Cost:</b> ₹{result.cost}
          </p>
          <p>
            <b>Charging Time:</b> {result.time} minutes
          </p>
        </div>
      )}
    </div>
  );
}
