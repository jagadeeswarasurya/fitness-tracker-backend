const errorHandler = (err, req, res, next) => {
    // Log the error stack for debugging (in all environments)
    console.error(err.stack);

    // Default to 500 if no other status code is set (e.g., by controllers)
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    // If in production, show a generic error message
    const message = process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred. Please try again later.'
        : err.message;

    // Respond with error message and stack (hide stack trace in production)
    res.json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

// Use default export for ES Module syntax
export default errorHandler;
