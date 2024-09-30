import Nutrition from '../models/Nutrition.js'; // Import the Nutrition model

// Create a new nutrition entry
const createNutrition = async (req, res) => {
    const { foodItem, calories, protein, carbs, fats, date } = req.body;

    try {
        // Ensure that all required fields are provided
        if (!foodItem || !calories || !protein || !carbs || !fats) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new nutrition entry with the authenticated user's ID
        const newNutrition = new Nutrition({
            userId: req.user._id, // Assuming req.user is set by the protect middleware
            foodItem,
            calories,
            protein,
            carbs,
            fats,
            date: date || Date.now(), // Use the provided date or the current date
        });

        // Save the new entry to the database
        await newNutrition.save();
        res.status(201).json(newNutrition); // Send back the saved nutrition entry
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all nutrition entries for the authenticated user
const getNutritionEntries = async (req, res) => {
    try {
        // Find all nutrition entries for the authenticated user
        const nutritionEntries = await Nutrition.find({ userId: req.user._id });

        // Send the entries back to the client
        res.json(nutritionEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a nutrition entry by ID
const updateNutrition = async (req, res) => {
    const { nutritionId } = req.params;
    const { foodItem, calories, protein, carbs, fats, date } = req.body;

    try {
        // Ensure that all required fields are provided
        if (!foodItem || !calories || !protein || !carbs || !fats) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find and update the nutrition entry by ID
        const updatedNutrition = await Nutrition.findByIdAndUpdate(
            nutritionId,
            { foodItem, calories, protein, carbs, fats, date },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedNutrition) {
            return res.status(404).json({ message: 'Nutrition entry not found' });
        }

        // Send back the updated nutrition entry
        res.json(updatedNutrition);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a nutrition entry by ID
const deleteNutrition = async (req, res) => {
    const { nutritionId } = req.params;

    try {
        // Find and delete the nutrition entry by ID
        const deletedNutrition = await Nutrition.findByIdAndDelete(nutritionId);

        if (!deletedNutrition) {
            return res.status(404).json({ message: 'Nutrition entry not found' });
        }

        // Send back a success message
        res.json({ message: 'Nutrition entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export all controller functions
export {
    createNutrition,
    getNutritionEntries,
    updateNutrition,
    deleteNutrition,
};
