import Project from '../models/Project.js';
import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const { receiver, projectId, rating, comment } = req.body;
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.status !== 'completed') {
      return res.status(400).json({ message: 'Reviews are allowed only after completion' });
    }

    const isReviewerMember = project.members.some((m) => String(m.user) === String(req.user._id));
    const isReceiverMember = project.members.some((m) => String(m.user) === String(receiver));

    if (!isReviewerMember || !isReceiverMember) {
      return res.status(403).json({ message: 'Both reviewer and receiver must be members' });
    }

    const review = await Review.create({ reviewer: req.user._id, receiver, projectId, rating, comment });
    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ receiver: req.params.userId })
      .populate('reviewer', 'name university')
      .populate('projectId', 'title');

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
