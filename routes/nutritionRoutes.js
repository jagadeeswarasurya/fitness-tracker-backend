// routes/nutritionRoutes.js

const express = require('express');
const {
    createNutrition,
    getNutritionEntries,
    updateNutrition,
    deleteNutrition,
} = require('../controllers/nutritionController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

// Route to create a new nutrition entry
// POST /api/nutrition
router.post('/', protect, createNutrition);

// Route to get all nutrition entries for the authenticated user
// GET /api/nutrition
router.get('/', protect, getNutritionEntries);

// Route to update a nutrition entry by ID
// PUT /api/nutrition/:nutritionId
router.put('/:nutritionId', protect, updateNutrition);

// Route to delete a nutrition entry by ID
// DELETE /api/nutrition/:nutritionId
router.delete('/:nutritionId', protect, deleteNutrition);

module.exports = router;
