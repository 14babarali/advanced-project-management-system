// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['planned', 'in_progress', 'completed'], default: 'planned' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
