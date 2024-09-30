import mongoose from 'mongoose';

// Defined the FitnessGoal schema
const fitnessGoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    goalType: {
        type: String,
        required: true,
        // Custom validator for case-insensitive matching
        validate: {
            validator: function (value) {
                const normalizedValue = value.toLowerCase(); // Normalize input to lower case
                return ['weight loss', 'muscle gain', 'endurance', 'other', 'weight gain'].includes(normalizedValue);
            },
            message: props => `${props.value} is not a valid goalType!`,
        },
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
export default FitnessGoal; // Ensure this line is correct
