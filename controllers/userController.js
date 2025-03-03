import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import User model
import Workout from '../models/Workout.js'; // Import Workout model
import Nutrition from '../models/Nutrition.js'; // Import Nutrition model
import FitnessGoal from '../models/FitnessGoal.js'; // Import FitnessGoal model

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

        // Respond with the user details
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id, // Include user ID
                username: newUser.username // Include username
            }
        });
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

        // Send the token and user details back to the client
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};


// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        // Find user and populate related data
        const user = await User.findById(req.user.id)
            .select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch related data in parallel
        const [workouts, nutritionEntries, fitnessGoals] = await Promise.all([
            Workout.find({ userId: user._id }).sort({ date: -1 }),
            Nutrition.find({ userId: user._id }).sort({ date: -1 }),
            FitnessGoal.find({ userId: user._id })
        ]);

        // Construct the response object
        const userProfile = {
            username: user.username,
            createdAt: user.createdAt,
            workouts: workouts || [],
            nutrition: nutritionEntries || [],
            fitnessGoals: fitnessGoals || [],
            // Add any other user fields you want to include
        };

        res.json(userProfile);
    } catch (error) {
        console.error('Profile Fetch Error:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};
