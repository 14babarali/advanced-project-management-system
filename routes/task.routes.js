// routes/task.routes.js
import express from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', checkRole(['Admin', 'Manager']), createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.patch('/:id', checkRole(['Admin', 'Manager']), updateTask);
router.delete('/:id', checkRole(['Admin', 'Manager']), deleteTask);

export default router;
