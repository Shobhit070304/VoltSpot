import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
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
    enum: ["Active", "Maintenance", "Inactive"],
    default: "Active",
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
    ref: "User",
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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
stationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Station = mongoose.model("Station", stationSchema);

export default Station;
