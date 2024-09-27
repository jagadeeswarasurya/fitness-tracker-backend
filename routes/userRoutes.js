import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js'; // Add .js extension
import { protect } from '../middleware/authMiddleware.js'; // Add .js extension

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', protect, getUserProfile);

// Exporting the router using ES Module syntax
export default router;
