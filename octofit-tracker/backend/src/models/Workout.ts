import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    tags: [{ type: String, trim: true }],
    recommendedFor: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export default model<Workout>('Workout', workoutSchema);
