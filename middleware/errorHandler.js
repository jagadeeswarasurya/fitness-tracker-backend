// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Log the error stack for debugging (in all environments)
    console.error(err.stack);

    // Set the status code to 500 if the response hasn't been set yet
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    // Send error message and stack (if not in production)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

// Use default export for ES Module syntax
export default errorHandler;
