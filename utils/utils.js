// utils/utils.js

const jwt = require('jsonwebtoken');

// Function to log messages
const logMessage = (message) => {
    console.log(`[LOG]: ${message}`);
};

// Function for error handling
const handleError = (res, error, statusCode = 500) => {
    console.error(`[ERROR]: ${error.message}`);
    res.status(statusCode).json({ message: 'Internal Server Error', error: error.message });
};

// Function to generate JWT tokens
const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to validate request body 
const validateRequestBody = (req, requiredFields) => {
    for (const field of requiredFields) {
        if (!req.body[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
};

// Export the utility functions
module.exports = {
    logMessage,
    handleError,
    generateToken,
    validateRequestBody,
};
