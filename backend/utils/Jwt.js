// utils/jwt.js
// Utility functions for handling JSON Web Tokens (JWT)
// Provides methods for generating and verifying access and refresh tokens

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/JWT');

// Generate access token for user authentication
// Access tokens are short-lived and used to access protected resources
exports.signToken = (id) => {
  return jwt.sign({ id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });
};

// Generate refresh token for extending user sessions
// Refresh tokens are long-lived and used to obtain new access tokens
exports.signRefreshToken = (id) => {
  return jwt.sign({ id }, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn
  });
};

// Verify access token validity
// Checks if an access token is genuine and hasn't been tampered with
exports.verifyToken = (token) => {
  return jwt.verify(token, jwtConfig.secret);
};

// Verify refresh token validity
// Checks if a refresh token is genuine and hasn't been tampered with
exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, jwtConfig.refreshSecret);
};