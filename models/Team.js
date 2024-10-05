// models/Team.js
import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);
