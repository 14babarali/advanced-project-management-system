// controllers/report.controller.js
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import TimeEntry from '../models/TimeEntry.js';

export const generateProjectReport = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId).populate('tasks');

    const reportData = {
      projectName: project.title,
      totalTasks: project.tasks.length,
      completedTasks: project.tasks.filter(task => task.status === 'completed').length,
      pendingTasks: project.tasks.filter(task => task.status === 'pending').length,
      inProgressTasks: project.tasks.filter(task => task.status === 'in_progress').length,
    };

    const timeEntries = await TimeEntry.find({ 'task': { $in: project.tasks } });
    const totalTimeSpent = timeEntries.reduce((total, entry) => total + entry.duration, 0);

    reportData.totalTimeSpent = totalTimeSpent;

    res.json(reportData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateUserReport = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ assignedTo: userId });

    const reportData = {
      userName: (await User.findById(userId)).name,
      totalTasksAssigned: tasks.length,
      completedTasks: tasks.filter(task => task.status === 'completed').length,
      pendingTasks: tasks.filter(task => task.status === 'pending').length,
      inProgressTasks: tasks.filter(task => task.status === 'in_progress').length,
    };

    const timeEntries = await TimeEntry.find({ user: userId });
    const totalTimeSpent = timeEntries.reduce((total, entry) => total + entry.duration, 0);

    reportData.totalTimeSpent = totalTimeSpent;

    res.json(reportData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
