import Application from '../models/Application.js';
import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      requiredSkills = [],
      requiredRoles = [],
      maxMembers,
      visibility,
      status = 'open'
    } = req.body;

    if (!title || !description || !maxMembers || !visibility) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const project = await Project.create({
      title,
      description,
      requiredSkills,
      requiredRoles,
      maxMembers,
      visibility,
      status,
      lead: req.user._id,
      university: req.user.university,
      members: [{ user: req.user._id, role: 'lead' }]
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { space = 'global' } = req.query;
    const query = { status: { $ne: 'filled' } };

    if (space === 'university') {
      query.visibility = 'university';
      query.university = req.user.university;
    } else {
      query.visibility = 'global';
    }

    const projects = await Project.find(query).populate('lead', 'name university');
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('lead', 'name university githubUsername')
      .populate('members.user', 'name email university skills');

    if (!project) return res.status(404).json({ message: 'Project not found' });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const applyToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.status === 'filled') return res.status(400).json({ message: 'Project is filled' });

    const exists = await Application.findOne({ projectId, applicantId: req.user._id, type: 'application' });
    if (exists) return res.status(409).json({ message: 'Already applied' });

    const application = await Application.create({ projectId, applicantId: req.user._id, type: 'application' });
    return res.status(201).json(application);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const inviteUser = async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (String(project.lead) !== String(req.user._id)) return res.status(403).json({ message: 'Only lead can invite' });

    const invite = await Application.findOneAndUpdate(
      { projectId, applicantId: userId, type: 'invite' },
      { projectId, applicantId: userId, type: 'invite', inviterId: req.user._id, status: 'pending' },
      { upsert: true, new: true }
    );

    return res.status(200).json(invite);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProjectStatus = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (String(project.lead) !== String(req.user._id)) return res.status(403).json({ message: 'Only lead can update status' });

    project.status = req.body.status;
    await project.save();

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
