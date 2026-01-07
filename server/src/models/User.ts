import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// 1. Define an interface representing a document in MongoDB
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  savedStations: mongoose.Schema.Types.ObjectId[];
  comparePassword(password: string): Promise<boolean>;
}

// 2. Create the Schema
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  savedStations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
    },
  ],
});

// Pre-save hook to hash password
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    if (this.password) {
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
