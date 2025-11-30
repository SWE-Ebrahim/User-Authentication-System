// utils/appError.js
// Custom error class for handling application errors
// Extends the built-in Error class to add custom properties
class AppError extends Error {
  // Constructor takes an error message and HTTP status code
  constructor(message, statusCode) {
    // Call parent Error class constructor with the message
    super(message);

    // Store the HTTP status code
    this.statusCode = statusCode;
    
    // Determine if this is a client error (4xx) or server error (5xx)
    // Client errors are marked as 'fail', server errors as 'error'
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    // Mark this as an operational error that we can handle gracefully
    // This helps distinguish between expected errors and programming bugs
    this.isOperational = true;

    // Capture the stack trace for debugging, excluding this constructor
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export the custom error class for use throughout the application
module.exports = AppError;