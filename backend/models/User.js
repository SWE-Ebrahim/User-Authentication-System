// models/User.js
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Define the user schema with all required fields and validations
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username must be less than 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    // Never send password in responses
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  // Fields for email verification
  emailVerifyToken: String,
  emailVerifyTokenExpires: Date,
  
  // Fields for login OTP
  loginOTP: String,
  loginOTPExpires: Date,
  
  // Fields for password reset
  resetOTP: String,
  resetOTPExpires: Date,
  
  // Track when password was last changed
  passwordChangedAt: Date,
  
  // When the user account was created
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Hash the password before saving the user
// Only runs when password is modified
userSchema.pre('save', async function() {
  // If password wasn't changed, skip hashing
  if (!this.isModified('password')) return;
  
  // Hash the password with salt rounds of 12
  this.password = await bcrypt.hash(this.password, 12);
});

// Update passwordChangedAt field when password is changed
userSchema.pre('save', function() {
  // Skip if password wasn't changed or if this is a new user
  if (!this.isModified('password') || this.isNew) return;
  
  // Set passwordChangedAt to current time (minus 1 second to ensure token is older)
  this.passwordChangedAt = Date.now() - 1000;
});

// Method to check if entered password matches the stored hashed password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  // Compare the plain text password with the hashed one
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Method to check if user changed password after JWT token was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  // If password was never changed, return false
  if (this.passwordChangedAt) {
    // Convert passwordChangedAt to timestamp format
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    // Return true if password was changed after token was issued
    return JWTTimestamp < changedTimestamp;
  }
  // Password was never changed
  return false;
};

// Generate email verification token
userSchema.methods.createEmailVerificationToken = function() {
  // Create random token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  // Hash the token before storing in database for security
  this.emailVerifyToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
  
  // Set token expiration to 24 hours from now
  this.emailVerifyTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
  
  // Return the plain token (to send in email)
  return verificationToken;
};

// Generate OTP codes for different purposes (email verification, password reset, login)
userSchema.methods.createOTP = function(field) {
  // Generate different length codes based on purpose
  let otp;
  
  // For login, generate 4-digit code
  if (field === 'loginOTP') {
    otp = Math.floor(1000 + Math.random() * 9000).toString();
  } 
  // For email verification and password reset, generate 6-digit code
  else {
    otp = Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  // Hash the OTP before storing in database for security
  this[`${field}Token`] = crypto.createHash('sha256').update(otp).digest('hex');
  
  // Set expiration to 10 minutes from now
  this[`${field}TokenExpires`] = Date.now() + 10 * 60 * 1000;
  
  // Return the plain OTP (to send to user)
  return otp;
};

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;