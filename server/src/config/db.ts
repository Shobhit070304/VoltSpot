import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    const mongoURI: string = process.env.MONGODB_URI || '';
    if (!mongoURI) throw new Error('MONGODB_URI is not defined');

    await mongoose.connect(mongoURI);

    if (process.env.NODE_ENV === 'development') {
      console.log('MongoDB connected successfully');
    }
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;
