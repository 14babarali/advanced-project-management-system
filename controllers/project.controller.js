
// controllers/project.controller.js
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import io from '../socket.js';

export const updateTaskStatus = async (req, res) => {
  try {
    const { projectId, taskId, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true }).populate('assignedTo');

    io.to(projectId).emit('task-updated', updatedTask);

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, teamId } = req.body;
    const project = await Project.create({ title, description, team: teamId });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('team').populate('tasks');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTaskToProject = async (req, res) => {
  try {
    const { projectId, taskId } = req.body;
    await Project.findByIdAndUpdate(projectId, { $addToSet: { tasks: taskId } });
    res.json({ message: 'Task added to project successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProjectStatus = async (req, res) => {
  try {
    const { projectId, status } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(projectId, { status }, { new: true }).populate('team').populate('tasks');
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
