const express = require('express');
const connectDB = require('./config/db'); // Database connection
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler'); // Import error handler

// Load environment variables
dotenv.config();

// Database Connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const fitnessGoalRoutes = require('./routes/fitnessGoalRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

// Define routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/fitness-goals', fitnessGoalRoutes); // Fitness goal-related routes
app.use('/api/nutrition', nutritionRoutes); // Nutrition-related routes
app.use('/api/workouts', workoutRoutes); // Workout-related routes

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Fitness Tracker API!');
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
