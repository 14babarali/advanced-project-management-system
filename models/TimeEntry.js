// models/TimeEntry.js
import mongoose from 'mongoose';

const timeEntrySchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startTime: Date,
  endTime: Date,
  duration: Number,
}, { timestamps: true });

export default mongoose.model('TimeEntry', timeEntrySchema);
