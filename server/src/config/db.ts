import mongoose from 'mongoose';
import EV from '../models/Car.js';
import Station from '../models/Station.js';

const seedEVs = async (): Promise<void> => {
  try {
    const count = await EV.countDocuments();
    if (count === 0) {
      console.log('EV collection is empty, auto-seeding default EV models...');
      await EV.insertMany([
        { name: 'Model 3 Long Range', manufacturer: 'Tesla', batterySize: 75, range: 576, chargingPort: 'CCS2' },
        { name: 'Ioniq 5', manufacturer: 'Hyundai', batterySize: 77.4, range: 507, chargingPort: 'CCS2' },
        { name: 'Nexon EV Max', manufacturer: 'Tata', batterySize: 40.5, range: 437, chargingPort: 'CCS2' },
        { name: 'ZS EV', manufacturer: 'MG', batterySize: 50.3, range: 461, chargingPort: 'CCS2' },
        { name: 'Leaf', manufacturer: 'Nissan', batterySize: 40, range: 270, chargingPort: 'CHAdeMO' },
      ]);
      console.log('Auto-seeded 5 EV models successfully.');
    }
  } catch (error: any) {
    console.error('Failed to auto-seed EV models:', error.message);
  }
};

const scaleStationPrices = async (): Promise<void> => {
  try {
    const stations = await Station.find({});
    let updatedCount = 0;
    
    for (const station of stations) {
      // Scale prices down to a realistic range of ₹8 to ₹13 per kWh (average commercial rates in India)
      if (station.price > 13) {
        // Divide by 1.8 and round to nearest whole number
        const newPrice = Math.max(8, Math.round(station.price / 1.8));
        station.price = newPrice;
        await station.save();
        updatedCount++;
      } else if (station.price < 8) {
        station.price = 8;
        await station.save();
        updatedCount++;
      }
    }
    if (updatedCount > 0) {
      console.log(`Successfully migrated and scaled down prices for ${updatedCount} stations.`);
    }
  } catch (error: any) {
    console.error('Failed to scale station prices:', error.message);
  }
};

// Function to connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    const mongoURI: string = process.env.MONGODB_URI || '';
    if (!mongoURI) throw new Error('MONGODB_URI is not defined');

    await mongoose.connect(mongoURI);

    if (process.env.NODE_ENV === 'development') {
      console.log('MongoDB connected successfully');
    }

    // Auto-seed EV models
    await seedEVs();
    
    // Scale station prices to realistic Indian EV pricing
    await scaleStationPrices();
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;
