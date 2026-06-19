import { Router } from 'express';
import WorkoutModel from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default router;
