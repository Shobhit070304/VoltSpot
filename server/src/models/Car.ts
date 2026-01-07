import mongoose, { Document, Model, Schema } from 'mongoose';

// 1. Define an interface for the EV document
export interface IEV extends Document {
  name: string;
  manufacturer: string;
  batterySize: number;
  range?: number;
  chargingPort?: string;
}

// 2. Create the Schema
const EVSchema = new Schema<IEV>({
  name: { type: String, required: true }, // Full name (e.g., Tesla Model 3)
  manufacturer: { type: String, required: true },
  batterySize: { type: Number, required: true }, // kWh
  range: { type: Number }, // km (optional)
  chargingPort: { type: String }, // CCS2, CHAdeMO, Type2 etc.
});

// Index to optimize queries by name and manufacturer
EVSchema.index({ name: 1, manufacturer: 1 });

const EV: Model<IEV> = mongoose.model<IEV>('EV', EVSchema);

export default EV;
