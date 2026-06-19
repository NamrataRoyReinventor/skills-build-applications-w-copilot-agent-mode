import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    profileImage: { type: String, default: '' },
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export default model<User>('User', userSchema);
