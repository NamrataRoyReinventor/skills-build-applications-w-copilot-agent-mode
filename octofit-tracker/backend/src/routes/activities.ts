import { Router } from 'express';
import ActivityModel from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await ActivityModel.find().populate('user').lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default router;
