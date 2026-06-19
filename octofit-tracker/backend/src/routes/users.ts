import { Router } from 'express';
import UserModel from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await UserModel.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default router;
