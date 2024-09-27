import Workout from '../models/Workout.js'; // Add .js extension

// Create a new workout
const createWorkout = async (req, res) => {
    const { exercise, duration, intensity, caloriesBurned } = req.body;
    const userId = req.user;

    try {
        const newWorkout = new Workout({
            userId,
            exercise,
            duration,
            intensity,
            caloriesBurned,
        });

        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all workouts for a user
const getWorkouts = async (req, res) => {
    const userId = req.user;

    try {
        const workouts = await Workout.find({ userId });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a workout by ID
const updateWorkout = async (req, res) => {
    const { workoutId } = req.params;
    const { exercise, duration, intensity, caloriesBurned } = req.body;

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            { exercise, duration, intensity, caloriesBurned },
            { new: true, runValidators: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        res.json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a workout by ID
const deleteWorkout = async (req, res) => {
    const { workoutId } = req.params;

    try {
        const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        res.json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exporting the controller functions using ES Module syntax
export {
    createWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
};
