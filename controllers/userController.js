import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import User model

// Register a new user
export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    // Check for required fields
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save(); // Save the new user

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error); // Detailed error logging
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token }); // Send the token back to the client
    } catch (error) {
        console.error('Login Error:', error); 
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        // Use req.user to find the user by ID
        const user = await User.findById(req.user.id); // Ensure req.user.id is used
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the username and createdAt date
        res.json({ 
            username: user.username, 
            createdAt: user.createdAt // Include createdAt in the response
        });
    } catch (error) {
        console.error('Profile Fetch Error:', error); 
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

