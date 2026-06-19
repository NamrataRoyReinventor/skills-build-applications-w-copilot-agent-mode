import { Router } from 'express';
import TeamModel from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await TeamModel.find().populate('members').lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default router;
