import express from 'express';
import {
    createGoal,
    updateGoal,
    deleteGoal,
    getGoals,
} from '../controllers/fitnessGoalController.js'; // Ensure the path and .js extension are correct
import { protect } from '../middleware/authMiddleware.js'; // Ensure the path and .js extension are correct

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

// Global error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ message: 'An unexpected error occurred' });
});

// Use export default for ES Module syntax
export default router;
