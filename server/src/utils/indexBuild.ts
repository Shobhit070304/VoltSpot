import dotenv from 'dotenv';
import connectDB from '../config/db.js';

import User from '../models/User.js';
import Station from '../models/Station.js';
import Review from '../models/Review.js';
import Report from '../models/Report.js';
import Car from '../models/Car.js';

dotenv.config();

// Connect to MongoDB
connectDB().catch((error: any) => {
  console.error('MongoDB connection error:', error.message);
  process.exit(1);
});

const indexBuild = async (): Promise<void> => {
  try {
    console.log('Indexes building...');
    await User.syncIndexes();
    await Station.syncIndexes();
    await Review.syncIndexes();
    await Report.syncIndexes();
    await Car.syncIndexes();
    console.log('Indexes built.');
  } catch (error: any) {
    // Silent error handling for production
    console.error('Error building indexes:', error.message);
  }
};

indexBuild();

export default indexBuild;
