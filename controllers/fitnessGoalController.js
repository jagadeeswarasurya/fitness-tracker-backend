// controllers/fitnessGoalController.js

import FitnessGoal from '../models/FitnessGoal.js'; // Ensure you use .js extension

// Created a new fitness goal
export const createGoal = async (req, res) => {
    const { goalType, target } = req.body;

    console.log('Request body:', req.body); // Log the request body for debugging

    try {
        const newGoal = new FitnessGoal({
            user: req.user,
            goalType,
            target,
        });

        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error) {
        console.error('Error creating goal:', error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
};
// Get all fitness goals for the logged-in user
export const getGoals = async (req, res) => {
    try {
        const goals = await FitnessGoal.find({ user: req.user });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a fitness goal by ID
export const updateGoal = async (req, res) => {
    const { goalId } = req.params;
    const { goalType, target } = req.body;

    try {
        // Find the goal by ID and update it
        const updatedGoal = await FitnessGoal.findByIdAndUpdate(
            goalId,
            { goalType, target },
            { new: true, runValidators: true }  
        );

        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a fitness goal by ID
export const deleteGoal = async (req, res) => {
    const { goalId } = req.params;

    try {
        const deletedGoal = await FitnessGoal.findByIdAndDelete(goalId);

        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a fitness goal by ID
export const getGoalById = async (req, res) => {
    const { goalId } = req.params;

    try {
        const goal = await FitnessGoal.findById(goalId);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized to access this goal' });
        }

        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
