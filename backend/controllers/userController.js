import User from '../models/User.js';

export const getProfile = async (req, res) => {
  return res.status(200).json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      university: req.body.university,
      skills: req.body.skills,
      domains: req.body.domains,
      expertiseLevel: req.body.expertiseLevel,
      bio: req.body.bio,
      githubUsername: req.body.githubUsername
    };

    Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { skill, domain, university } = req.query;
    const query = {};

    if (skill) query.skills = { $in: [skill] };
    if (domain) query.domains = { $in: [domain] };
    if (university) query.university = university;

    const users = await User.find(query).select('-password');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
