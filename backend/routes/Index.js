// routes/index.js 
// Testing route file for backend testing and server checks
const express = require('express');
const authRoutes = require('./AuthRoutes');

// Create a new router instance
const router = express.Router();

// Health check route
// This endpoint can be used by monitoring services to check if the server is running
// Returns a success message with current timestamp
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Mount all authentication-related routes under the '/auth' path
// This includes signup, login, password reset, and other auth endpoints
router.use('/auth', authRoutes);

// Export the router to be used in the main application file
module.exports = router;