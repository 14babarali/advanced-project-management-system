// controllers/taskRecommendation.controller.js
import User from '../models/User.js';
import Task from '../models/Task.js';
import Skill from '../models/Skill.js';
import ml from 'ml-regression';

export const trainModel = async () => {
  try {
    const users = await User.find().populate('skills');
    const tasks = await Task.find();

    const trainingData = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < tasks.length; j++) {
        const userSkills = users[i].skills.map(skill => skill.name);
        const taskRequirements = tasks[j].requirements || [];

        const matchCount = userSkills.filter(skill => taskRequirements.includes(skill)).length;
        const similarityScore = matchCount / Math.max(userSkills.length, taskRequirements.length);

        trainingData.push([similarityScore, Number(tasks[j].assignedTo === users[i]._id)]);
      }
    }

    const regression = new ml.LogisticRegression();
    await regression.train(trainingData, {
      learningRate: 0.01,
      iterations: 10000,
      batchSize: 32,
    });

    return regression;
  } catch (error) {
    console.error('Error training model:', error);
    throw error;
  }
};

export const recommendTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('skills');

    const tasks = await Task.find({ assignedTo: null });
    const recommendedTasks = [];

    for (const task of tasks) {
      const taskRequirements = task.requirements || [];
      const userSkills = user.skills.map(skill => skill.name);

      const matchCount = userSkills.filter(skill => taskRequirements.includes(skill)).length;
      const similarityScore = matchCount / Math.max(userSkills.length, taskRequirements.length);

      const probability = await regression.predict(similarityScore);
      if (probability > 0.7) { // Adjust this threshold as needed
        recommendedTasks.push(task);
      }
    }

    res.json(recommendedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
