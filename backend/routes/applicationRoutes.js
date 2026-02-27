import express from 'express';
import { apply, getProjectApplications, respond } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply', protect, apply);
router.post('/respond', protect, respond);
router.get('/project/:id', protect, getProjectApplications);

export default router;
