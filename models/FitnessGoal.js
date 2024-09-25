const mongoose = require('mongoose');

// Defined the FitnessGoal schema
const fitnessGoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    goalType: {
        type: String,
        enum: ['Weight Loss', 'Muscle Gain', 'Endurance', 'Other', 'Lose Weight'], // Add 'Lose Weight' here
        required: true,
    },
    target: {
        type: Number,
        required: true, // Target value for the fitness goal 
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    updatedAt: {
        type: Date,
        default: Date.now, 
    },
});

// Middleware to update the 'updatedAt' field before saving
fitnessGoalSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Update the timestamp before saving
    next();
});

// Create and export the FitnessGoal model
const FitnessGoal = mongoose.model('FitnessGoal', fitnessGoalSchema);
module.exports = FitnessGoal;
