import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requiredSkills: { type: [String], default: [] },
    requiredRoles: { type: [String], default: [] },
    members: { type: [memberSchema], default: [] },
    maxMembers: { type: Number, required: true, min: 1 },
    visibility: { type: String, enum: ['university', 'global'], required: true },
    university: { type: String, required: true },
    status: {
      type: String,
      enum: ['draft', 'open', 'filled', 'in_progress', 'completed'],
      default: 'draft'
    }
  },
  { timestamps: true }
);

projectSchema.methods.syncFilledStatus = function syncFilledStatus() {
  if (this.members.length >= this.maxMembers) {
    this.status = 'filled';
  }
};

export default mongoose.model('Project', projectSchema);
