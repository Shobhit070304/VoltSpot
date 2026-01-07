import mongoose, { Schema, Document, Model  } from 'mongoose';

// 1. Define an interface for the Station document
export interface IStation extends Document {
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'Active' | 'Maintenance' | 'Inactive';
  powerOutput: number;
  connectorType: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  amenities: string[];
  averageRating: number;
  price: number;
}

const stationSchema = new Schema<IStation>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Maintenance', 'Inactive'],
    default: 'Active',
  },
  powerOutput: {
    type: Number,
    required: true,
    min: 0,
  },
  connectorType: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  amenities: [String],
  averageRating: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Indexes
stationSchema.index({ name: 1 }); // fast name searches
stationSchema.index({ location: 1 }); // filter by location
stationSchema.index({ status: 1 }); // filter by status
stationSchema.index({ createdBy: 1 }); // find all stations by a user
stationSchema.index({ latitude: 1, longitude: 1 }); // geo-related queries

// Update the updatedAt field on save
stationSchema.pre<IStation>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Station: Model<IStation> = mongoose.model<IStation>('Station', stationSchema);

export default Station;
