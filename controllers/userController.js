const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/jwt');

// Register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', 
        });

        
        res.json({ token });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ username: user.username });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};
