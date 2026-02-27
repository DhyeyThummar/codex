import Application from '../models/Application.js';
import Project from '../models/Project.js';

export const apply = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const existing = await Application.findOne({ projectId, applicantId: req.user._id, type: 'application' });
    if (existing) return res.status(409).json({ message: 'Already applied' });

    const application = await Application.create({ projectId, applicantId: req.user._id, type: 'application' });
    return res.status(201).json(application);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const respond = async (req, res) => {
  try {
    const { applicationId, status } = req.body;
    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    const project = await Project.findById(application.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const isLead = String(project.lead) === String(req.user._id);
    const isReceiverOfInvite = application.type === 'invite' && String(application.applicantId) === String(req.user._id);

    if (!isLead && !isReceiverOfInvite) {
      return res.status(403).json({ message: 'Not allowed to respond' });
    }

    application.status = status;
    await application.save();

    if (status === 'accepted') {
      const alreadyMember = project.members.some((m) => String(m.user) === String(application.applicantId));
      if (!alreadyMember) {
        project.members.push({ user: application.applicantId, role: 'member' });
        project.syncFilledStatus();
        if (project.status !== 'filled' && project.status === 'draft') {
          project.status = 'open';
        }
        await project.save();
      }
    }

    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProjectApplications = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (String(project.lead) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Only lead can view project applications' });
    }

    const applications = await Application.find({ projectId: req.params.id })
      .populate('applicantId', 'name email university skills')
      .populate('inviterId', 'name');

    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
