// routes/project.routes.js
import express from 'express';
import { createProject, getAllProjects, addTaskToProject, updateProjectStatus } from '../controllers/project.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', checkRole(['Admin', 'Manager']), createProject);
router.get('/', getAllProjects);
router.post('/add-task', checkRole(['Admin', 'Manager']), addTaskToProject);
router.patch('/:id/update-status', checkRole(['Admin', 'Manager']), updateProjectStatus);

export default router;
