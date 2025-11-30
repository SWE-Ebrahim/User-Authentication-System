// controllers/errorController.js
const AppError = require('../utils/appError');

// Handle MongoDB cast errors (e.g., invalid ID format)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handle MongoDB duplicate field errors (e.g., duplicate email)
const handleDuplicateFieldsDB = (err) => {
  // Extract the duplicate value from the error message using regex
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handle MongoDB validation errors (e.g., missing required fields)
const handleValidationErrorDB = (err) => {
  // Get all validation error messages
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handle invalid JWT token errors
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

// Handle expired JWT token errors
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

// Send detailed error response in development environment
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

// Send generic error response in production environment
const sendErrorProd = (err, res) => {
  // For trusted operational errors, send the error message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } 
  // For programming or unknown errors, don't leak details to client
  else {
    // Log the full error for developers
    console.error('ERROR 💥', err);
    
    // Send a generic message to client
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

// Main error handling middleware
module.exports = (err, req, res, next) => {
  // Set default error properties if not already set
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Handle errors differently based on environment
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Create a copy of the error object to manipulate
    let error = { ...err };
    error.message = err.message;
    
    // Handle specific error types with custom messages
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    
    sendErrorProd(error, res);
  }
};