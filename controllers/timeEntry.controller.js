// controllers/timeEntry.controller.js
import TimeEntry from '../models/TimeEntry.js';
import Task from '../models/Task.js';

export const createTimeEntry = async (req, res) => {
  try {
    const { taskId, startTime, endTime } = req.body;
    const duration = (endTime.getTime() - startTime.getTime()) / 60000; // Convert to minutes
    const timeEntry = await TimeEntry.create({ task: taskId, user: req.user, startTime, endTime, duration });
    await Task.findByIdAndUpdate(taskId, { $addToSet: { timeEntries: timeEntry._id } });
    res.status(201).json(timeEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTimeEntriesByTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const timeEntries = await TimeEntry.find({ task: taskId }).sort({ createdAt: -1 });
    res.json(timeEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTotalTimeSpentOnTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const totalTime = await TimeEntry.aggregate([
      { $match: { task: mongoose.Types.ObjectId(taskId) } },
      { $group: { _id: null, totalDuration: { $sum: '$duration' } } }
    ]);
    res.json(totalTime[0] || { totalDuration: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
