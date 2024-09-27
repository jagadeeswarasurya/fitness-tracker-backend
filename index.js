import express from 'express';
import connectDB from './config/db.js'; // Use .js extension
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './middleware/errorHandler.js'; // Use .js extension

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Import routes
import userRoutes from './routes/userRoutes.js';
import fitnessGoalRoutes from './routes/fitnessGoalRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/fitness-goals', fitnessGoalRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/workouts', workoutRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Fitness Tracker API!');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
