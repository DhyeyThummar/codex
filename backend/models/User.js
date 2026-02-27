import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    university: { type: String, required: true, trim: true },
    skills: { type: [String], default: [] },
    domains: { type: [String], default: [] },
    githubUsername: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    expertiseLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    bio: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
