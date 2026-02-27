import express from 'express';
import { createReview, getReviewsByUser } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/:userId', protect, getReviewsByUser);

export default router;
