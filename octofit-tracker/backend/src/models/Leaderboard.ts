import { InferSchemaType, Schema, Types, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    entityType: { type: String, enum: ['user', 'team'], required: true },
    entityId: { type: Types.ObjectId, required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;
export default model<LeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
