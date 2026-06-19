import { Router } from 'express';
import LeaderboardEntryModel from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find().sort({ rank: 1, points: -1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default router;
