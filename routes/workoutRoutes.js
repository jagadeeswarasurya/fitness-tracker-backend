import express from 'express';
import {
    createWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
} from '../controllers/workoutController.js'; // Add .js extension
import { protect } from '../middleware/authMiddleware.js'; // Add .js extension

const router = express.Router();

// Route to create a workout
// POST /api/workouts
router.post('/', protect, createWorkout);

// Route to get all workouts for a user
// GET /api/workouts
router.get('/', protect, getWorkouts);

// Route to update a workout by ID
// PUT /api/workouts/:workoutId
router.put('/:workoutId', protect, updateWorkout);

// Route to delete a workout by ID
// DELETE /api/workouts/:workoutId
router.delete('/:workoutId', protect, deleteWorkout);

// Exporting the router using ES Module syntax
export default router;
