// routes/team.routes.js
import express from 'express';
import { createTeam, getAllTeams, addMemberToTeam, removeMemberFromTeam } from '../controllers/team.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', checkRole(['Admin', 'Manager']), createTeam);
router.get('/', getAllTeams);
router.post('/add-member', checkRole(['Admin', 'Manager']), addMemberToTeam);
router.post('/remove-member', checkRole(['Admin', 'Manager']), removeMemberFromTeam);

export default router;
