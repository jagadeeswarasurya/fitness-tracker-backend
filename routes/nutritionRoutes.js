// routes/nutritionRoutes.js

import express from 'express';
import {
    createNutrition,
    getNutritionEntries,
    updateNutrition,
    deleteNutrition,
} from '../controllers/nutritionController.js'; // Add .js extension
import { protect } from '../middleware/authMiddleware.js'; // Add .js extension

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

// Export the router using ES Module syntax
export default router;
