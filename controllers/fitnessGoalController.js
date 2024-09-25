const FitnessGoal = require('../models/FitnessGoal');

// Created a new fitness goal
const createGoal = async (req, res) => {
    const { goalType, target } = req.body;

    try {
        
        const newGoal = new FitnessGoal({
            user: req.user, 
            goalType,
            target,
        });

        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all fitness goals for the logged-in user
const getGoals = async (req, res) => {
    try {
        const goals = await FitnessGoal.find({ user: req.user });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a fitness goal by ID
const updateGoal = async (req, res) => {
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
const deleteGoal = async (req, res) => {
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


const getGoalById = async (req, res) => {
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

module.exports = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    getGoalById,
};
