// routes/timeEntry.routes.js
import express from 'express';
import { createTimeEntry, getTimeEntriesByTask, getTotalTimeSpentOnTask } from '../controllers/timeEntry.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createTimeEntry);
router.get('/by-task/:taskId', getTimeEntriesByTask);
router.get('/total-time-spent/:taskId', getTotalTimeSpentOnTask);

export default router;
