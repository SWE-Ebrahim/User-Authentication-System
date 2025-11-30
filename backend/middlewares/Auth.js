// middleware/auth.js
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwtConfig = require('../config/JWT');

// Protect routes middleware
// Checks if user is logged in and has valid token
exports.protect = catchAsync(async (req, res, next) => {
  // Get token from header or cookie
  let token;
  
  // Check if token is in Authorization header with Bearer scheme
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // If not in header, check if token is in cookies
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // If no token found, send error
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // Verify the token is valid and not tampered with
  const decoded = await promisify(jwt.verify)(token, jwtConfig.secret);

  // Check if user still exists in database
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // Check if user changed password after token was issued
  // If yes, token should be invalid
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // Add user info to request object so other middleware can access it
  req.user = currentUser;
  next();
});

// Restrict access based on user roles
// Pass allowed roles as arguments (e.g., restrictTo('admin', 'moderator'))
exports.restrictTo = (...roles) => {
  // Return middleware function
  return (req, res, next) => {
    // Check if user's role is in the allowed roles list
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    // User has required role, allow access
    next();
  };
};