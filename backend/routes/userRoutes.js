import express from 'express';
import { getProfile, getUserById, getUsers, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.get('/profile', protect, getProfile);
router.put('/profile/update', protect, updateProfile);
router.get('/:id', protect, getUserById);

export default router;
