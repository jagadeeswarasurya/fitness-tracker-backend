// models/Nutrition.js

const mongoose = require('mongoose');

// Defined the Nutrition schema
const nutritionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  
    },
    date: {
        type: Date,
        required: true,
        default: Date.now  
    },
    meals: [{
        mealType: {
            type: String,
            required: true, 
        },
        foodItem: {
            type: String,
            required: true, 
        },
        calories: {
            type: Number,
            required: true,  
        },
        protein: {
            type: Number,
            required: true,  
        },
        carbs: {
            type: Number,
            required: true, 
        },
        fats: {
            type: Number,
            required: true, 
        },
    }],
});

// Created the Nutrition model
const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
