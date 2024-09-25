// routes/workoutRoutes.js

const express = require('express');
const {
    createWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
} = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

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

module.exports = router;
