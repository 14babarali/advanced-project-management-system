// models/Skill.js
import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: String,
  description: String,
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
