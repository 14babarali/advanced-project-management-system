// // models/Task.js
// import mongoose from 'mongoose';

// const taskSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// }, { timestamps: true });

// export default mongoose.model('Task', taskSchema);


// models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timeEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeEntry' }],
  priority: Number,
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
