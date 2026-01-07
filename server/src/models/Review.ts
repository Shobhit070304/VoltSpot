import mongoose, { Document, Model, Schema } from 'mongoose';

// 1. Define an interface for the Review document
export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  station: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

// 2. Create the schema
const reviewSchema = new Schema<IReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  station: {
    type: Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexing for faster queries
reviewSchema.index({ station: 1, user: 1 }, { unique: true });

const Reviews: Model<IReview> = mongoose.model<IReview>('Review', reviewSchema);
export default Reviews;
