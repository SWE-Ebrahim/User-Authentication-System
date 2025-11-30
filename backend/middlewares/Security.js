// middlewares/security.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const xss = require('xss');

// Set security HTTP headers to protect against common attacks
// Helmet helps secure Express apps with various HTTP headers
exports.setSecurityHeaders = helmet();

// Enable CORS (Cross-Origin Resource Sharing) for frontend communication
// Allows requests from frontend domain in production or localhost in development
exports.enableCors = cors({
  // In production, only allow requests from the client URL
  // In development, allow requests from localhost:5173 (Vite default)
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:5173',
  // Allow cookies and credentials to be sent with requests
  credentials: true
});

// Limit repeated requests from the same IP to prevent abuse
// This helps protect against brute force and denial-of-service attacks
exports.rateLimiter = rateLimit({
  // Maximum number of requests allowed per time window
  max: 100,
  // Time window in milliseconds (1 hour)
  windowMs: 60 * 60 * 1000,
  // Message sent when rate limit is exceeded
  message: 'Too many requests from this IP, please try again'
});

// Custom middleware to sanitize MongoDB operators and prevent NoSQL injection
// Removes dangerous operators like $where, $ne, etc. from request data
const sanitizeMongo = (req, res, next) => {
  // Function to recursively sanitize an object
  const sanitizeObject = (obj) => {
    // Skip if not an object or is null
    if (!obj || typeof obj !== 'object') return;
    
    // Check each property in the object
    for (const key in obj) {
      // Remove properties that start with $ or contain dots (MongoDB operators)
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } 
      // Recursively sanitize nested objects
      else if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        sanitizeObject(obj[key]);
      }
    }
  };

  // Sanitize request body, query parameters, and route parameters
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) sanitizeObject(req.body);
  if (req.query && typeof req.query === 'object' && !Array.isArray(req.query)) sanitizeObject(req.query);
  if (req.params && typeof req.params === 'object' && !Array.isArray(req.params)) sanitizeObject(req.params);

  next();
};

// Export the MongoDB sanitization middleware
exports.mongoSanitize = sanitizeMongo;

// Custom middleware to sanitize input and prevent XSS (Cross-Site Scripting) attacks
// Removes or escapes malicious HTML/JavaScript code from user input
const sanitizeXSS = (req, res, next) => {
  // Function to recursively sanitize values
  const sanitizeValue = (value) => {
    // If string, sanitize it with xss library
    if (typeof value === 'string') {
      return xss(value);
    } 
    // If object, recursively sanitize its properties
    else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const sanitized = {};
      for (const key in value) {
        sanitized[key] = sanitizeValue(value[key]);
      }
      return sanitized;
    } 
    // If array, sanitize each element
    else if (Array.isArray(value)) {
      return value.map(item => sanitizeValue(item));
    }
    // Return unchanged if not string, object, or array
    return value;
  };

  // Sanitize the request body if it exists
  if (req.body && typeof req.body === 'object') {
    const sanitizedBody = sanitizeValue(req.body);
    // Replace the original body with sanitized version
    for (const key in req.body) {
      delete req.body[key];
    }
    Object.assign(req.body, sanitizedBody);
  }

  next();
};

// Export the XSS sanitization middleware
exports.xssClean = sanitizeXSS;

// Prevent parameter pollution attacks
// Protects against HTTP parameter pollution where attackers send multiple
// parameters with the same name to manipulate application logic
exports.preventParamPollution = hpp({
  // List of parameters that are allowed to appear multiple times
  whitelist: [
    'duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
});