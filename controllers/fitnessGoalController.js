import FitnessGoal from '../models/FitnessGoal.js'; // Assuming you have a FitnessGoal model

// Create a new fitness goal
export const createGoal = async (req, res) => {
    const { goalType, target } = req.body;

    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        // Validate required fields
        if (!goalType || !target) {
            return res.status(400).json({ message: 'Goal type and target are required.' });
        }

        // Create a new fitness goal entry
        const newGoal = new FitnessGoal({
            userId: req.user,  // req.user should contain the authenticated user's ID
            goalType,
            target,
            createdAt: Date.now(),
        });

        // Save the new fitness goal to the database
        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all fitness goals for the authenticated user
export const getGoals = async (req, res) => {
    try {
        // Fetch all goals associated with the authenticated user
        const fitnessGoals = await FitnessGoal.find({ userId: req.user });

        // Send the fitness goals back to the client
        res.json(fitnessGoals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a fitness goal by ID
export const updateGoal = async (req, res) => {
    const { goalId } = req.params;
    const { goalType, target } = req.body;

    try {
        // Find and update the goal by its ID
        const updatedGoal = await FitnessGoal.findByIdAndUpdate(
            goalId,
            { goalType, target },
            { new: true, runValidators: true }
        );

        // If the goal is not found, return an error
        if (!updatedGoal) {
            return res.status(404).json({ message: 'Fitness goal not found' });
        }

        // Return the updated goal to the client
        res.json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a fitness goal by ID
export const deleteGoal = async (req, res) => {
    const { goalId } = req.params;

    try {
        // Find and delete the fitness goal by its ID
        const deletedGoal = await FitnessGoal.findByIdAndDelete(goalId);

        // If the goal is not found, return an error
        if (!deletedGoal) {
            return res.status(404).json({ message: 'Fitness goal not found' });
        }

        // Return a success message to the client
        res.json({ message: 'Fitness goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
