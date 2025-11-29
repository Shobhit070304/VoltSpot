import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

import User from './users/User.js';
import Station from './stations/Station.js';
import Review from './stations/Review.js';
import Report from './stations/Report.js';
import Car from './cars/EV.js';

dotenv.config();

// Connect to MongoDB
connectDB().catch((error) => {
  console.error('MongoDB connection error:', error.message);
  process.exit(1);
});

const indexBuild = async () => {
  try {
    // await mongoose.connection.db.dropIndexes();
    // console.log("Indexes dropped.");
    console.log('Indexes building...');
    await User.syncIndexes();
    await Station.syncIndexes();
    await Review.syncIndexes();
    await Report.syncIndexes();
    await Car.syncIndexes();
    console.log('Indexes built.');
  } catch (error) {
    // Silent error handling for production
    console.error('Error building indexes:', error.message);
  }
};

indexBuild();

export default indexBuild;
