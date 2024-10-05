// controllers/task.controller.js
import Task from '../models/Task.js';
import User from '../models/User.js';

// controllers/task.controller.js
import TaskPrioritizer from '../services/taskPrioritizer.service.js';

const taskPrioritizer = new TaskPrioritizer();
await taskPrioritizer.initialize();

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const priority = await taskPrioritizer.prioritizeTask(description);
    
    const task = await Task.create({ title, description, priority });
    
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const createTask = async (req, res) => {
    try {
      const { title, description, assignedTo, projectId } = req.body;
      const task = await Task.create({ title, description, assignedTo, createdBy: req.user });
      if (projectId) {
        await Project.findByIdAndUpdate(projectId, { $addToSet: { tasks: task._id } });
      }
      await User.findByIdAndUpdate(assignedTo, { $addToSet: { tasks: task._id } });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// export const createTask = async (req, res) => {
//   try {
//     const { title, description, assignedTo } = req.body;
//     const task = await Task.create({ title, description, assignedTo, createdBy: req.user });
//     await User.findByIdAndUpdate(assignedTo, { $addToSet: { tasks: task._id } });
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate('assignedTo');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true }).populate('assignedTo');
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.status(204).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
