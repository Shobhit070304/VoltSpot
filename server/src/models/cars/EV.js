import mongoose from "mongoose";

const EVSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name (e.g., Tesla Model 3)
  manufacturer: { type: String, required: true },
  batterySize: { type: Number, required: true }, // kWh
  range: { type: Number }, // km (optional)
  chargingPort: { type: String }, // CCS2, CHAdeMO, Type2 etc.
});

const EV = mongoose.model("EV", EVSchema);

export default EV;
