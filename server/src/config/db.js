import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/VoltSpot';

    await mongoose.connect(mongoURI);

    if (process.env.NODE_ENV === 'development') {
      console.log('MongoDB connected successfully');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // In production, don't exit the process, let it retry
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
    // In production, throw the error to be handled by the application
    throw error;
  }
};

export default connectDB;