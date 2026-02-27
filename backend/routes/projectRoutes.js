import express from 'express';
import {
  applyToProject,
  createProject,
  getProjectById,
  getProjects,
  inviteUser,
  updateProjectStatus
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createProject);
router.get('/', protect, getProjects);
router.get('/:id', protect, getProjectById);
router.post('/apply/:projectId', protect, applyToProject);
router.post('/invite', protect, inviteUser);
router.patch('/status/:id', protect, updateProjectStatus);

export default router;
