// controllers/authController.js
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Import required models and utilities
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const jwtConfig = require('../config/JWT');

// Generate JWT tokens
// Creates an access token for a user with their ID
const signToken = (id) => {
  return jwt.sign({ id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });
};

// Creates a refresh token for a user with their ID
const signRefreshToken = (id) => {
  return jwt.sign({ id }, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn
  });
};

// Create and send JWT token
// Sets tokens as cookies and sends response with user data
const createSendToken = (user, statusCode, res) => {
  // Generate access and refresh tokens
  const token = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  
  // Configure cookie options
  const cookieOptions = {
    // Set cookie expiration date
    expires: new Date(
      Date.now() + parseInt(jwtConfig.cookieExpiresIn) * 24 * 60 * 60 * 1000
    ),
    // Prevent client-side JavaScript access to cookie
    httpOnly: true,
    // Only send cookie over HTTPS in production
    secure: process.env.NODE_ENV === 'production'
  };
  
  // Send tokens as cookies
  res.cookie('jwt', token, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);
  
  // Remove password from output for security
  user.password = undefined;
  
  // Send response with tokens and user data
  res.status(statusCode).json({
    status: 'success',
    token,
    refreshToken,
    data: {
      user
    }
  });
};

// Register user
// Creates new user and sends email verification code
exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  
  // Create new user with provided details
  const newUser = await User.create({
    username,
    email,
    password
  });
  
  // Generate email verification code (6-digit)
  const verificationCode = newUser.createOTP('emailVerify');
  await newUser.save({ validateBeforeSave: false });
  
  // Prepare email message with verification code
  const message = `Welcome to our app! Please verify your email using this 6-digit code: ${verificationCode}\n\nThis code will expire in 10 minutes.`;
  
  // Send verification email to user
  try {
    await sendEmail({
      email: newUser.email,
      subject: 'Email Verification Code',
      message
    });
    
    res.status(201).json({
      status: 'success',
      message: 'OTP sent to your email!'
    });
  } catch (err) {
    // Handle email sending errors
    return next(
      new AppError('There was an error sending the email. Try again later!', 500)
    );
  }
});

// Verify email with code
// Verifies code and marks user as verified
exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { email, code } = req.body;
  
  // Validate required fields
  if (!email || !code) {
    return next(new AppError('Please provide email and verification code!', 400));
  }
  
  // Hash the provided code to compare with stored hash
  const hashedCode = crypto
    .createHash('sha256')
    .update(code)
    .digest('hex');
    
  // Find user with matching email, code, and unexpired token
  const user = await User.findOne({
    email,
    emailVerifyToken: hashedCode,
    emailVerifyTokenExpires: { $gt: Date.now() }
  });
  
  // Check if valid user with unexpired code exists
  if (!user) {
    return next(new AppError('Code is invalid or has expired', 400));
  }
  
  // Mark user as verified and clear verification token fields
  user.isVerified = true;
  user.emailVerifyToken = undefined;
  user.emailVerifyTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });
  
  // Automatically log in user after successful email verification
  createSendToken(user, 200, res);
});

// Login user
// Validates credentials and logs user in
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  
  // Validate required fields
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  
  // Find user by email and include password field for comparison
  const user = await User.findOne({ email }).select('+password');
  
  // Check if user exists and password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  
  // Check if user has verified their email
  if (!user.isVerified) {
    return next(new AppError('Please verify your email first!', 401));
  }
  
  // Log the user in by creating and sending tokens
  createSendToken(user, 200, res);
});

// Verify login OTP
// Validates OTP and logs user in
exports.verifyLoginOTP = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;
  
  // Validate required fields
  if (!email || !otp) {
    return next(new AppError('Please provide email and OTP!', 400));
  }
  
  // Find user by email
  const user = await User.findOne({ email });
  
  // Check if user exists
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  // Hash provided OTP for comparison
  const hashedOTP = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');
    
  // Validate OTP and check if it hasn't expired
  if (user.loginOTP !== hashedOTP || user.loginOTPExpires < Date.now()) {
    return next(new AppError('Invalid or expired OTP', 400));
  }
  
  // Clear OTP fields after successful verification
  user.loginOTP = undefined;
  user.loginOTPExpires = undefined;
  await user.save({ validateBeforeSave: false });
  
  // Log the user in by creating and sending tokens
  createSendToken(user, 200, res);
});

// Forgot password
// Generates reset OTP and sends it via email
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Find user by provided email
  const user = await User.findOne({ email: req.body.email });
  
  // Check if user exists
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }
  
  // Generate password reset OTP
  const otp = user.createOTP('resetOTP');
  await user.save({ validateBeforeSave: false });
  
  // Prepare email message with reset instructions and OTP
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: /resetPassword along with this 6-digit OTP: ${otp}\nIf you didn't forget your password, please ignore this email!`;
  
  // Send password reset email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset OTP (valid for 10 min)',
      message
    });
    
    res.status(200).json({
      status: 'success',
      message: 'OTP sent to email!'
    });
  } catch (err) {
    // Clear reset OTP fields if email fails to send
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;
    await user.save({ validateBeforeSave: false });
    
    return next(
      new AppError('There was an error sending the email. Try again later!', 500)
    );
  }
});

// Reset password
// Validates OTP and updates password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { email, otp, password } = req.body;
  
  // Find user by email
  const user = await User.findOne({ email });
  
  // Check if user exists
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  // Hash provided OTP for comparison
  const hashedOTP = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');
    
  // Validate OTP and check if it hasn't expired
  if (user.resetOTP !== hashedOTP || user.resetOTPExpires < Date.now()) {
    return next(new AppError('Invalid or expired OTP', 400));
  }
  
  // Update user's password and clear reset OTP fields
  user.password = password;
  user.resetOTP = undefined;
  user.resetOTPExpires = undefined;
  await user.save();
  
  // Log the user in by creating and sending new tokens
  createSendToken(user, 200, res);
});

// Protect routes middleware
// Verifies JWT token and grants access to authenticated users
exports.protect = catchAsync(async (req, res, next) => {
  // Extract token from authorization header or cookies
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  
  // Check if token exists
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  
  // Verify token signature and decode payload
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
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  
  // Grant access to protected route
  req.user = currentUser;
  next();
});

// Logout
// Clears JWT cookies
exports.logout = (req, res) => {
  // Send "loggedout" value in cookies with short expiration
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.cookie('refreshToken', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};