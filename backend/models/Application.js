import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    type: { type: String, enum: ['application', 'invite'], default: 'application' },
    inviterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
  },
  { timestamps: true }
);

applicationSchema.index({ projectId: 1, applicantId: 1, type: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
