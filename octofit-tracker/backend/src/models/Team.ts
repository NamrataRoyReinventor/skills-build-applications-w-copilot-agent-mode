import { InferSchemaType, Schema, Types, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;
export default model<Team>('Team', teamSchema);
