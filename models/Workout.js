// models/Workout.js

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    exercise: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, 
        required: true,
    },
    intensity: {
        type: String, 
        required: true,
    },
    caloriesBurned: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Workout', workoutSchema);
