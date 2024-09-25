// controllers/nutritionController.js

const Nutrition = require('../models/Nutrition'); 

// Created a new nutrition entry
const createNutrition = async (req, res) => {
    const { meal, calories, date } = req.body;

    try {
        const newNutrition = new Nutrition({
            user: req.user, 
            meal,
            calories,
            date,
        });

        await newNutrition.save();
        res.status(201).json(newNutrition);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all nutrition entries for the authenticated user
const getNutritionEntries = async (req, res) => {
    try {
        const nutritionEntries = await Nutrition.find({ user: req.user }); 
        res.json(nutritionEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a nutrition entry by ID
const updateNutrition = async (req, res) => {
    const { nutritionId } = req.params;
    const { meal, calories, date } = req.body;

    try {
        const updatedNutrition = await Nutrition.findByIdAndUpdate(
            nutritionId,
            { meal, calories, date },
            { new: true, runValidators: true }
        );

        if (!updatedNutrition) {
            return res.status(404).json({ message: 'Nutrition entry not found' });
        }

        res.json(updatedNutrition);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a nutrition entry by ID
const deleteNutrition = async (req, res) => {
    const { nutritionId } = req.params;

    try {
        const deletedNutrition = await Nutrition.findByIdAndDelete(nutritionId);

        if (!deletedNutrition) {
            return res.status(404).json({ message: 'Nutrition entry not found' });
        }

        res.json({ message: 'Nutrition entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNutrition,
    getNutritionEntries,
    updateNutrition,
    deleteNutrition,
};
