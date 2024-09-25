// routes/fitnessGoalRoutes.js

const express = require('express');
const {
    createGoal,
    updateGoal,
    deleteGoal,
    getGoals,
} = require('../controllers/fitnessGoalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new fitness goal
// POST /api/fitness-goals
router.post('/', protect, createGoal);

// Route to get all fitness goals for the authenticated user
// GET /api/fitness-goals
router.get('/', protect, getGoals);

// Route to update a fitness goal by ID
// PUT /api/fitness-goals/:goalId
router.put('/:goalId', protect, updateGoal);

// Route to delete a fitness goal by ID
// DELETE /api/fitness-goals/:goalId
router.delete('/:goalId', protect, deleteGoal);

module.exports = router;
