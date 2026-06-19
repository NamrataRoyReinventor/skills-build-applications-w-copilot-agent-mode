import { InferSchemaType, Schema, Types, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    calories: { type: Number, default: 0, min: 0 },
    performedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export type Activity = InferSchemaType<typeof activitySchema>;
export default model<Activity>('Activity', activitySchema);
