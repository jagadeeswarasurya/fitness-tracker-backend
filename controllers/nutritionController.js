import Nutrition from '../models/Nutrition.js'; // ES module syntax

// Create a new nutrition entry
export const createNutrition = async (req, res) => {
    const { foodItem, calories, protein, carbs, fats, date } = req.body;

    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        if (!foodItem || !calories || !protein || !carbs || !fats) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newNutrition = new Nutrition({
            userId: req.user,  // Directly use req.user as it holds the user's ID
            foodItem,
            calories,
            protein,
            carbs,
            fats,
            date: date || Date.now(),
        });

        await newNutrition.save();
        res.status(201).json(newNutrition);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all nutrition entries for the authenticated user
export const getNutritionEntries = async (req, res) => {
    try {
        const nutritionEntries = await Nutrition.find({ userId: req.user });
        res.json(nutritionEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a nutrition entry by ID
export const updateNutrition = async (req, res) => {
    const { nutritionId } = req.params;
    const { foodItem, calories, protein, carbs, fats, date } = req.body;

    try {
        const updatedNutrition = await Nutrition.findByIdAndUpdate(
            nutritionId,
            { foodItem, calories, protein, carbs, fats, date },
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
export const deleteNutrition = async (req, res) => {
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
