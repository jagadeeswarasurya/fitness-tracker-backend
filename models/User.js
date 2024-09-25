// models/User.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,  
        trim: true,    
        minlength: 3,  
        maxlength: 30  
    },
    password: {
        type: String,
        required: true,
        minlength: 6  
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

// Created the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
