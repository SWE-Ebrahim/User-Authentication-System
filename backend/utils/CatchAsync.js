// utils/catchAsync.js
// Utility function to simplify error handling in async route handlers
// Wraps async functions to automatically catch and forward errors to Express error handler

// This function takes an async route handler function and returns a new function
// that ensures any errors are properly caught and passed to the next() function
module.exports = (fn) => (req, res, next) => {
  // Execute the async function and wrap it in a Promise
  // If the Promise rejects (throws an error), catch it and pass to Express error handler
  Promise.resolve(fn(req, res, next)).catch(next);
};