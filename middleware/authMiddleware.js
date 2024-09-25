const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
           
            const token = req.headers.authorization.split(' ')[1];
            console.log('Extracted Token:', token); // Debug log
            
            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded Token:', decoded); // Debug log
            
            // Attach the user ID from the decoded token to the request object
            req.user = decoded.id; 
            return next(); 
        } catch (error) {
            // Log the error for better debugging
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    
    // If no token was found in the Authorization header
    return res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = { protect };
