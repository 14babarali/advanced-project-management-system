// controllers/team.controller.js
import Team from '../models/Team.js';
import User from '../models/User.js';

export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const team = await Team.create({ name });
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMemberToTeam = async (req, res) => {
  try {
    const { teamId, userId } = req.body;
    await Team.findByIdAndUpdate(teamId, { $addToSet: { members: userId } });
    await User.findByIdAndUpdate(userId, { team: teamId });
    res.json({ message: 'Member added to team successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeMemberFromTeam = async (req, res) => {
  try {
    const { teamId, userId } = req.body;
    await Team.findByIdAndUpdate(teamId, { $pull: { members: userId } });
    await User.findByIdAndUpdate(userId, { team: null });
    res.json({ message: 'Member removed from team successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
