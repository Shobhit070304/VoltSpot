import Station from "../models/Station.js";
import { validationResult } from "express-validator";
import User from "../models/User.js";

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
    } = req.body;

    const station = await Station.create({
      name,
      location,
      latitude,
      longitude,
      status,
      powerOutput,
      connectorType,
      createdBy: req.user.userId,
    });

    res.status(200).json(station);
  } catch (error) {
    next(error);
  }
};

// Update station
const updateStation = async (req, res, next) => {
  try {
    console.log("Hello", req.body);
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
    const populatedUser = await User.findById(req.user.userId)
      .populate({
        path: 'savedStations',
        model: 'Station',
        select: 'name location status powerOutput connectorType latitude longitude'
      });

    console.log("Populated saved stations:", populatedUser.savedStations);
    
    res.status(200).json({ savedStations: populatedUser.savedStations });
  } catch (error) {
    console.error("Error in getSavedStations:", error);
    res.status(500).json({ 
      message: "Error fetching saved stations",
      error: error.message 
    });
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
  getSavedStations
};
