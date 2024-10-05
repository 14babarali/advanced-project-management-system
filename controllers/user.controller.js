
// controllers/user.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Task from '../models/Task.js';

dotenv.config();

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('tasks').select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { tasks: taskId } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/user.controller.js
import AuditTrailService from '../services/auditTrail.service.js';

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    
    await AuditTrailService.logAction(`Created user ${newUser.name}`, req.user._id);
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// // controllers/user.controller.js
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import User from '../models/User.js';

// dotenv.config();

// export const createUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ name, email, password: hashedPassword, role });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findById(userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password');
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     await User.findByIdAndDelete(userId);
//     res.status(204).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
