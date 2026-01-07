import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReport extends Document {
  station: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  issueType: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    station: {
      type: Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    issueType: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

reportSchema.index({ station: 1, user: 1 });

const Report: Model<IReport> = mongoose.model<IReport>('Report', reportSchema);
export default Report;