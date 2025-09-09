import Station from "../../models/stations/Station.js";
import { validationResult } from "express-validator";
import User from "../../models/users/User.js";
import EV from "../../models/cars/EV.js";

// Get all stations
const getStations = async (req, res, next) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    next(error);
  }
};

// Get my stations
const getMyStations = async (req, res, next) => {
  try {
    const stations = await Station.find({ createdBy: req.user.userId });
    res.status(200).json({ stations });
  } catch (error) {
    next(error);
  }
};

// Get station by ID
const getStationById = async (req, res, next) => {
  try {
    const station = await Station.findOne({
      _id: req.params.id,
    });

    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    res.status(200).json({ station });
  } catch (error) {
    next(error);
  }
};

// Create station
const createStation = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const {
      name,
      location,
      latitude,
      longitude,
      status,
      powerOutput,
      connectorType,
      amenities,
    } = req.body;

    const station = await Station.create({
      name,
      location,
      latitude,
      longitude,
      status,
      powerOutput,
      connectorType,
      amenities,
      createdBy: req.user.userId,
    });

    res.status(201).json(station);
  } catch (error) {
    next(error);
  }
};

// Update station
const updateStation = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const {
      name,
      location,
      latitude,
      longitude,
      status,
      powerOutput,
      connectorType,
      amenities,
    } = req.body;

    const station = await Station.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      {
        name,
        location,
        latitude,
        longitude,
        status,
        powerOutput,
        connectorType,
        amenities,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    res.status(200).json(station);
  } catch (error) {
    next(error);
  }
};

// Delete station
const deleteStation = async (req, res, next) => {
  try {
    const station = await Station.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    res.status(200).json({ message: "Station deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Save a station
const saveStation = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Check if the station is already saved
    const user = await User.findById(req.user.userId);
    if (user.savedStations.includes(station._id)) {
      user.savedStations = user.savedStations.filter(
        (savedStation) => savedStation.toString() !== station._id.toString()
      );
      await user.save();
      return res.status(200).json({
        message: "Station removed from saved stations",
        savedStations: user.savedStations,
      });
    }
    // Add the station to the user's saved stations
    user.savedStations.push(station._id);
    await user.save();
    res.status(200).json({
      message: "Station saved successfully",
      savedStations: user.savedStations,
    });
  } catch (error) {
    next(error);
  }
};

// Get saved stations
const getSavedStations = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the actual stations with population
    const populatedUser = await User.findById(req.user.userId).populate({
      path: "savedStations",
      model: "Station",
      select:
        "name location status powerOutput connectorType latitude longitude",
    });

    res.status(200).json({ savedStations: populatedUser.savedStations });
  } catch (error) {
    next(error);
  }
};

// Get suggestions
const getStationSuggestions = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const stations = await Station.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    })
      .limit(5) // return top 5 matches
      .select("name location"); // only send needed fields

    res.json(stations);
  } catch (err) {
    next(err);
  }
};

// Get estimate cost & time
const estimateChargingPrice = async (req, res, next) => {
  try {
    const { stationPower, pricePerKWh, evId, chargeFrom, chargeTo } = req.body;

    const ev = await EV.findById(evId);
    if (!ev) return res.status(400).json({ error: "Invalid EV model" });

    // Calculate energy needed
    const batterySize = ev.batterySize; // kWh
    const energyNeeded = ((chargeTo - chargeFrom) / 100) * batterySize; // kWh

    // Cost & Time
    const cost = energyNeeded * pricePerKWh;
    const time = energyNeeded / stationPower; // hours
    res.json({
      ev: ev.name,
      energyNeeded: energyNeeded.toFixed(2),
      cost: cost.toFixed(2),
      time: (time * 60).toFixed(0), // minutes
    });
  } catch (err) {
    next(err);
  }
};

export {
  getStations,
  getMyStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
  saveStation,
  getSavedStations,
  getStationSuggestions,
  estimateChargingPrice,
};
