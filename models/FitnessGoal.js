import mongoose from 'mongoose';

const fitnessGoalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    goalType: {
        type: String,
        required: true,
    },
    target: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const FitnessGoal = mongoose.model('FitnessGoal', fitnessGoalSchema);

// Ensure you have a default export
export default FitnessGoal;
