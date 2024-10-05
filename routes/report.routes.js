// routes/report.routes.js
import express from 'express';
import { generateProjectReport, generateUserReport } from '../controllers/report.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/project/:projectId', checkRole(['Admin', 'Manager']), generateProjectReport);
router.get('/user/:userId', checkRole(['Admin', 'Manager']), generateUserReport);

export default router;
