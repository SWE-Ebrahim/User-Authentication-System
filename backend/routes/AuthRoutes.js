// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/AuthController');
const { protect } = require('../middlewares/Auth');

// Create a new router instance
const router = express.Router();

// User registration endpoint
// Creates new user account and sends email verification code
router.post('/signup', authController.signup);

// Email verification endpoint
// Verifies user's email address using the code sent to their email
router.post('/verify-email', authController.verifyEmail);

// User login endpoint
// Authenticates user with email and password
router.post('/login', authController.login);

// Password recovery endpoint
// Sends password reset OTP to user's email
router.post('/forgot-password', authController.forgotPassword);

// Password reset endpoint
// Resets user's password after validating OTP
router.patch('/reset-password', authController.resetPassword);

// User logout endpoint
// Clears authentication cookies
router.get('/logout', authController.logout);

// Protected route example
// This route requires authentication to access
// The protect middleware verifies the user's token before allowing access
router.get('/protected', protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'You have access to this protected route!',
    user: req.user
  });
});

// Export the router to be used in the main app
module.exports = router;